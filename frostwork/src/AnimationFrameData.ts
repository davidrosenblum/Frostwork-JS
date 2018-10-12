export interface AnimationConfig{
    frames:number;
    axis:"x"|"y";
    width:number;
    height:number;
    paddingX?:number;
    paddingY?:number;
    offsetX?:number;
    offsetY?:number;
}

export class AnimationFrameData{
    private _clipX:number;
    private _clipY:number;
    private _clipWidth:number;
    private _clipHeight:number;

    constructor(clipX:number, clipY:number, clipWidth:number, clipHeight:number){
        this._clipX = clipX;
        this._clipY = clipY;
        this._clipHeight = clipHeight;
        this._clipWidth = clipWidth;
    }

    public static createFrames(opts:AnimationConfig):AnimationFrameData[]{
        let frames:AnimationFrameData[] = new Array<AnimationFrameData>(opts.frames);

        let ox:number = opts.offsetX || 0,
            oy:number = opts.offsetY || 0;

        let px:number = opts.paddingX || 0,
            py:number = opts.paddingY || 0;

        for(let i:number = 0, x:number=0, y:number=0; i < opts.frames; i++){

            if(opts.axis === "x"){
                x = (px + opts.width) * i + ox;
            }
            else if(opts.axis === "y"){
                y = (py + opts.height) * i + oy;
            }

            frames[i] = new AnimationFrameData(x, y, opts.width, opts.height);
        }

        return frames;
    }

    public get clipX():number{
        return this._clipX;
    }

    public get clipY():number{
        return this._clipY;
    }

    public get clipWidth():number{
        return this._clipWidth;
    }

    public get clipHeight():number{
        return this._clipHeight;
    }
}