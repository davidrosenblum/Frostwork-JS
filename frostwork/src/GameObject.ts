import { AnimatedSprite } from "./AnimatedSprite";
import { Object2D } from "./Object2D";
import { Scroller } from "./Scroller";
import { Bounds } from "./Bounds";
import { CollisionGrid } from "./CollisionGrid";

export enum Facing{
    LEFT = "left",
    RIGHT = "right",
    UP = "up",
    DOWN = "down"
}

export class GameObject extends AnimatedSprite{
    private _moveSpeed:number;
    public facing:Facing;

    constructor(url:string, width?:number, height?:number, depth?:number, x?:number, y?:number){
        super(url, width, height, depth, x, y);

        this._moveSpeed = 1;
        this.facing = Facing.RIGHT
    }

    public moveUp(collidables?:Object2D[], grid?:CollisionGrid, bounds?:Bounds, scroller?:Scroller):Object2D{
        this.y -= this.moveSpeed;

        let hit:Object2D = null;

        if(grid){
            hit = grid.getAtObject(this);
            if(hit && this.hitTest(hit)){
                this.y = hit.y;
                return hit;
            }
        }

        if(collidables){
            hit = this.hitTestGroup(collidables);
            if(hit){
                this.y = hit.y;
                return hit;
            }
        }

        if(bounds){
            if(this.y < bounds.y){
                this.y = bounds.y;
            }
        }

        // if(scroller)
    }

    public moveDown(collidables?:Object2D[], grid?:CollisionGrid, bounds?:Bounds, scroller?:Scroller):Object2D{
        this.y += this.moveSpeed;

        let hit:Object2D = null;

        if(grid){
            hit = grid.getAtObject(this);
            if(hit && this.hitTest(hit)){
                this.y = hit.bottom - this.height;
                return hit;
            }
        }

        if(collidables){
            hit = this.hitTestGroup(collidables);
            if(hit){
                this.y = hit.bottom - this.height;
                return hit;
            }
        }

        if(bounds){
            if(this.bottom > bounds.bottom){
                this.y = bounds.bottom - this.height;
            }
        }

        // if(scroller)
    }

    public set moveSpeed(ms:number){
        this._moveSpeed = Math.abs(ms);
    }

    public get moveSpeed():number{
        return this._moveSpeed;
    }
}