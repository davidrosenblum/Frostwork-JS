import { Object2D, Position } from "./Object2D";

export class CollisionGrid{
    private _tileSize:number;
    private _grid:Object2D[][];

    constructor(width:number, height:number, tileSize:number){
        this._tileSize = tileSize;

        this._grid = CollisionGrid.createEmptyMatrix(width, height);
    }

    private inBounds(x:number, y:number):boolean{
        return x in this._grid && y in this._grid;
    }

    public getAt(x:number, y:number):Object2D{
        if(this.inBounds(x, y)){
            return this._grid[y][x];
        }
        return null;
    }

    public getAtObject(object:Object2D):Object2D{
        let pos:Position = object.getApproxTile(this.tileSize);
        return this.getAt(pos.x, pos.y);
    }

    public storeAt(object:Object2D, x:number, y:number):void{
        if(this.inBounds(x, y)){
            this._grid[y][x] = object; 
        }
    }

    public get tileSize():number{
        return this._tileSize;
    }

    private static createEmptyMatrix(width:number, height:number):Object2D[][]{
        let matrix:Object2D[][] = new Array<Array<Object2D>>(height);
        
        for(let i:number = 0; i < matrix.length; i++){
            matrix[i] = new Array<Object2D>(width).fill(null);
        }

        return matrix;
    }
}