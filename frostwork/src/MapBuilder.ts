import { Sprite } from "./Sprite";
import { Scene } from "./Scene";
import { CollisionGrid } from "./CollisionGrid";

export class MapBuilder{
    public static buildGrid(layout:number[][], tileset:(typeof Sprite)[], tileSize:number, scene:Scene, offsetX:number=0, offsetY:number=0):CollisionGrid{
        let grid:CollisionGrid = new CollisionGrid(layout[0].length * tileSize, layout.length * tileSize, tileSize);

        for(let y:number = 0; y < layout.length; y++){
            for(let x:number = 0; x < layout[y].length; x++){
                let pt:number = layout[y][x];
                let type:(typeof Sprite) = tileset[pt];

                if(type){
                    let tile:Sprite = new type();

                    tile.x = x * tileSize + offsetX;
                    tile.y = y * tileSize + offsetY;

                    if(tile.height > tileSize){
                        tile.y -= (tile.height - tileSize);
                    }

                    scene.addChild(tile);
                }
            }
        }

        return grid;
    }
}