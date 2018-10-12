import { Object2D } from "./Object2D";
import { Object2DEvent } from "./Events";

export interface ParentObject<T>{
    addChild(child:T):boolean;
    addChildAt(child:T, index:number):boolean;
    addChildren(children:T[]):void;
    removeChild(child:T):T;
    removeChildAt(index:number):T;
    removeChildren(children?:T[]):void;
    numChildren:number;
}

export abstract class Object2DContainer extends Object2D implements ParentObject<Object2D>{
    private _children:{[id:string]: Object2D};
    private _drawList:Object2D[];

    constructor(width?:number, height?:number, depth?:number, x?:number, y?:number){
        super(width, height, depth, x, y);

        this._children = {};
        this._drawList = [];
    }    

    private drawChildren(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void{
        this._drawList.forEach(child => child.draw(ctx, offsetX, offsetY));
    }

    public draw(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void{
        this.drawChildren(ctx, offsetX + this.x, offsetY + this.y);
    }

    public addChild(child:Object2D):boolean{
        if(!this.containsChild(child)){
            this._children[child.id] = child;
            this._drawList.push(child);

            child.setParent(this);

            this.emit(new Object2DEvent("add-child", child));

            return true;
        }
        return false;
    }

    public addChildAt(child:Object2D, index:number):boolean{
        if(!this.containsChild(child)){
            let list:Object2D[] = [];

            for(let i:number = 0; i < this.numChildren; i++){
                if(i === index){
                    list.push(child);
                }

                list.push(this.getChildAt(i));
            }

            this._children[child.id] = child;
            this._drawList = list;

            child.setParent(this);

            this.emit(new Object2DEvent("add-child", child));

            return true;
        }
        return false;
    }

    public addChildren(children:Object2D[]):void{
        children.forEach(child => this.addChild(child));
    }

    public removeChild(target:Object2D):Object2D{
        return this.removeChildAt(this.findChildIndex(target));
    }

    public removeChildAt(index:number):Object2D{
        if(index in this._drawList){
            let child:Object2D = this.getChildAt(index);

            this._drawList.splice(index, 1);
            delete this._children[child.id];

            child.setParent(null);

            this.emit(new Object2DEvent("remove-child", child));

            return child;
        }
        return null;
    }

    public removeChildren(targets?:Object2D[]):void{
        if(targets){
            targets.forEach(target => this.removeChild(target));
        }
        else{
            let len:number = this.numChildren;

            for(let i:number = 0; i < len; i++){
                this.removeChildAt(i);
            }
        }
    }

    public findChildIndex(target:Object2D):number{
        for(let i:number = 0; i < this.numChildren; i++){
            if(this.getChildAt(i) === target){
                return i;
            }
        }
        return -1;
    }

    public containsChild(target:Object2D):boolean{
        return target.id in this._children;
    }

    public swapChildren(child1:Object2D, child2:Object2D):boolean{
        let a:number = -1,
            b:number = 1;

        for(let i:number = 0; i < this.numChildren; i++){
            if(this.getChildAt(i) === child1){
                a = i;
            }
            else if(this.getChildAt(i) === child2){
                b = i;
            }

            if(a > -1 && b > -1){
                this._drawList[a] = child2;
                this._drawList[b] = child1;
                return true;
            }
        }
        return false;
    }

    public swapChildrenAt(index1:number, index2:number):boolean{
        let a:Object2D = this.getChildAt(index1),
            b:Object2D = this.getChildAt(index2);

        if(a && b){
            this._drawList[index1] = b;
            this._drawList[index2] = a;
            return true;
        }
        return false;
    }

    public depthSort():void{
        for(let i:number = 0; i < this.numChildren; i++){
            let child1:Object2D = this.getChildAt(i);

            for(let j:number = i + 1; j < this.numChildren; j++){
                let child2:Object2D = this.getChildAt(j);

                if(child1.bottom < child2.bottom){
                    this._drawList[i] = child2;
                    this._drawList[j] = child1;
                    child1 = child2;
                }
            }
        }
    }

    public forEachChild(fn:(child:Object2D, i?:number)=>any):void{
        for(let i:number = 0; i < this.numChildren; i++){
            fn(this.getChildAt(i), i);
        }
    }

    public forAllDescendants(fn:(child:Object2D)=>any):void{
        this.forEachChild(child => {
            fn(child);

            if(child instanceof Object2DContainer){
                child.forEachChild(fn);
            }
        });
    }

    public getChildAt(index:number):Object2D{
        return (index in this._drawList) ? this._drawList[index] : null;
    }

    public get numChildren():number{
        return this._drawList.length;
    }
}