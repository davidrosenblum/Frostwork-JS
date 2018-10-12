import { Object2D } from "./Object2D";

export interface TextFieldConfig{
    text?:string;
    font?:string;
    fillStyle?:string;
    strokeStyle?:string;
    maxWidth?:number|undefined;
    x?:number;
    y?:number;
}

export class TextField extends Object2D{
    private static MEASURE_CTX:CanvasRenderingContext2D = document.createElement("canvas").getContext("2d");

    public static DEFAULT_FILL_STYLE:string = "white";
    public static DEFAULT_STROKE_STYLE:string = "black";
    public static DEFAULT_FONT:string = "15px arial";

    public text:string;
    public fillStyle:string;
    public strokeStyle:string;
    public font:string;
    public maxWidth:number|undefined;

    constructor(text?:string, x?:number, y?:number){
        super(x, y);

        this.text = text || "";
        this.fillStyle = TextField.DEFAULT_FILL_STYLE;
        this.strokeStyle = TextField.DEFAULT_STROKE_STYLE;
        this.font = TextField.DEFAULT_FONT;
    }

    public draw(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void{
        if(this.visible && this.text){
            let x:number = this.x + offsetX,
                y:number = this.y + offsetY;

            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.font = this.font;
            ctx.fillStyle = this.fillStyle;
            ctx.strokeStyle = this.strokeStyle;

            ctx.fillText(this.text, x, y, this.maxWidth);
            ctx.strokeText(this.text, x, y, this.maxWidth);

            ctx.restore();
        }
    }

    public set width(width){
        // do nothing
    }

    public set height(height){
        // do nothing
    }

    public get width():number{
        TextField.MEASURE_CTX.font = this.font;
        return TextField.MEASURE_CTX.measureText(this.text).width;
    }

    public get height():number{
        return parseFloat(this.font);
    }

    public static create(opts:TextFieldConfig):TextField{
        let tf:TextField = new TextField(opts.text, opts.x, opts.y);
        
        if(opts.font) tf.font = opts.font;
        if(opts.fillStyle) tf.fillStyle = opts.fillStyle;
        if(opts.strokeStyle) tf.strokeStyle = opts.strokeStyle;
        if(opts.maxWidth) tf.maxWidth = opts.maxWidth;

        return tf;
    }
}