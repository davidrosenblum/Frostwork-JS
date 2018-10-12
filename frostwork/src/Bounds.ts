export interface Collidable<T>{
    hitTest(target:T):boolean;
    hitTestGroup(targets:T[]):T;
}

export class Bounds implements Collidable<Bounds>{
    private _x:number;
    private _y:number;
    private _width:number;
    private _height:number;

    constructor(x:number, y:number, width:number, height:number){
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }

    public copy():Bounds{
        return new Bounds(this.x, this.y, this.width, this.height);
    }

    public hitTest(target:Bounds):boolean{
        if(target.x < this.right && this.x < target.right){
            if(target.y < this.bottom && this.y < target.bottom){
                return true;
            }
        }
        return false;
    }

    public hitTestGroup(targets:Bounds[]):Bounds{
        for(let target of targets){
            if(this.hitTest(target)){
                return target;
            }
        }
        return null;
    }

    public get centerX():number{
        return this.x + this.width / 2;
    }

    public get centerY():number{
        return this.y + this.height / 2;
    }

    public get right():number{
        return this.x + this.width;
    }

    public get bottom():number{
        return this.y + this.height;
    }

    public get x():number{
        return this._x;
    }

    public get y():number{
        return this._y;
    }

    public get width():number{
        return this._width;
    }

    public get height():number{
        return this._height;
    }
}