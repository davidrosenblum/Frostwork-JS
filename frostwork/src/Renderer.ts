import  { Scene }  from "./Scene";
import { Sprite } from "./Sprite";
import { Object2DEvent } from "./Events";

export class Renderer{
    private _canvas:HTMLCanvasElement;
    private _context:CanvasRenderingContext2D;
    private _scene:Scene;
    private _rendering:boolean;

    constructor(width:number=550, height:number=400){
        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");
        this._scene = null;
        this._rendering = false;

        this.resize(width, height);
        this._canvas.addEventListener("click", this.handleMouseClick.bind(this));
    }

    private handleMouseClick(evt:MouseEvent):void{
        let cursor:Sprite = new Sprite(null, 3, 3, 0, evt.clientX, evt.clientY);

        this.scene.forAllDescendants(child => {
            if(child.hitTest(cursor)){
                child.emit(new Object2DEvent("click"));
            }
        });
    }

    private render():void{
        this.scene.draw(this._context, 0, 0);

        if(this._rendering){
            window.requestAnimationFrame(this.render.bind(this));
        }
    }

    public startRendering():void{
        if(!this.isRendering){
            this._rendering = true;
            this.render();
        }
    }

    public stopRendering():void{
        this._rendering = false;
    }

    public resize(width:number, height:number):void{
        this.canvas.width = width;
        this.canvas.height = height;
    }

    public get isRendering():boolean{
        return this._rendering;
    }

    public get canvas():HTMLCanvasElement{
        return this._canvas;
    }

    public get scene():Scene{
        return this._scene;
    }

    public get canvasWidth():number{
        return this.canvas.width;
    }

    public get canvasHeight():number{
        return this.canvas.height;
    }
}