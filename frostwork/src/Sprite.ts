import { AssetsManager } from "./AssetsManager";
import { Object2DContainer } from "./Object2DContainer";

export interface SpriteConfig{
    url?:string;
    width?:number;
    height?:number;
    depth?:number;
    x?:number;
    y?:number;
}

export class Sprite extends Object2DContainer{
    private static readonly EMPTY_IMAGE:HTMLImageElement = document.createElement("img");

    private _image:HTMLImageElement;

    constructor(url?:string, width?:number, height?:number, depth?:number, x?:number, y?:number){
        super(width, height, depth, x, y);

        this._image = Sprite.EMPTY_IMAGE;
        
        if(url){
            AssetsManager.loadImage(url).then(img => this._image = img);
        }
    }

    public draw(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void{
        if(this.visible){
            let x:number = this.x + offsetX,
                y:number = this.y + offsetY;

            super.draw(ctx, x, y);

            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.drawImage(this.image, x, y, this.width, this.height);
            ctx.restore();
        }
    }

    public get image():HTMLImageElement{
        return this._image;
    }

    public static create(opts:SpriteConfig):Sprite{
        return new Sprite(opts.url, opts.width, opts.height, opts.depth, opts.x, opts.y);
    }
}
