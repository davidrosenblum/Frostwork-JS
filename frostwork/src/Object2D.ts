import { EventEmitter } from "./EventEmitter";
import { TokenGenerator } from "./TokenGenerator";
import { Object2DContainer } from "./Object2DContainer";
import { Bounds, Collidable } from "./Bounds";
import { Object2DEvent } from "./Events";

export interface Position{
    x:number;
    y:number;
}

export interface Size{
    width:number;
    height:number;
    depth:number;
}

export interface Drawable{
    draw(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void;
}

export abstract class Object2D extends EventEmitter implements Collidable<Object2D>, Drawable{
    private static readonly tokens:TokenGenerator = new TokenGenerator(16);

    private _id:string;
    private _position:Position;
    private _size:Size;
    private _parent:Object2DContainer;
    private _alpha:number;
    public visible:boolean;
    public mouseInteractive:boolean;
    
    constructor(width:number=0, height:number=0, depth:number=0, x:number=0, y:number=0){
        super();

        this._id = Object2D.tokens.nextToken();
        this._position = {x, y};
        this._size = {width, height, depth};
        this._parent = null;
        this._alpha = 1;
        this.visible = true;
        this.mouseInteractive = false;
    }

    public abstract draw(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void;

    public hitTest(target:Object2D):boolean{
        if(this.x < target.right && target.x < this.right){
            if(this.y < target.bottom && target.y < this.bottom){
                return true;
            }
        }
        return false;
    }

    public hitTestGroup(targets:Object2D[]):Object2D{
        for(let target of targets){
            if(this.hitTest(target)){
                return target;
            }
        }
        return null;
    }

    public copyPosition(target:Object2D):void{
        let {x, y} = target;
        this._position = {x, y};
    }

    public copySize(target:Object2D):void{
        let {width, height, depth} = target;
        this._size = {width, height, depth};
    }

    public setPosition(x:number, y:number):void{
        this._position.x = x;
        this._position.y = y;
        this.emit(new Object2DEvent("move"));
    }

    public setSize(width:number, height:number, depth:number):void{
        this._size = {width, height, depth};
        this.emit(new Object2DEvent("resize"));
    }

    public setParent(parent:Object2DContainer):void{
        if(!parent){
            this._parent = null;
        }
        else if(parent.containsChild(this)){
            this._parent = parent;

            this.emit(new Object2DEvent("add", parent));
        }
    }

    public getApproxTile(tileSize:number):Position{
        let x:number = this.x,
            y:number = this.y;

        return {x, y};
    }

    public getBoundingBox():Bounds{
        return new Bounds(this.x, this.y, this.width, this.height);
    }

    public set alpha(alpha:number){
        if(alpha >= 0 && alpha <= 1){
            this._alpha = alpha;
        }       
    }

    public set x(x:number){
        this._position.x = x;
        this.emit(new Object2DEvent("move"));
    }

    public set y(y:number){
        this._position.y = y;
        this.emit(new Object2DEvent("move"));
    }

    public set width(width:number){
        this._size.width = width;
        this.emit(new Object2DEvent("resize"));
    }

    public set height(height:number){
        this._size.height = height;
        this.emit(new Object2DEvent("resize"));
    }

    public set depth(depth:number){
        this._size.depth = depth;
        this.emit(new Object2DEvent("resize"));
    }

    public get right():number{
        return this.x + this.width;
    }

    public get bottom():number{
        return this.y + this.height;
    }

    public get x():number{
        return this._position.x;
    }

    public get y():number{
        return this._position.y;
    }

    public get width():number{
        return this._size.width;
    }

    public get height():number{
        return this._size.height;
    }

    public get depth():number{
        return this._size.depth;
    }

    public get id():string{
        return this._id;
    }

    public get parent():Object2DContainer{
        return this._parent;
    }

    public get alpha():number{
        return this._alpha;
    }
}
