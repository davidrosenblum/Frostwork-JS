import { Sprite, SpriteConfig } from './Sprite';
import { AnimationFrameData } from './AnimationFrameData';

export class AnimatedSprite extends Sprite{
    private _animations:{[name:string]: AnimationFrameData[]};
    private _currFrame:number;
    private _currAnim:string;
    private _animating:boolean;

    constructor(url?:string, width?:number, height?:number, depth?:number, x?:number, y?:number){
        super(url, width, height, depth, x, y);

        this._animations = {};
        this._currFrame = 0;
        this._currAnim = null;
        this._animating = false;
    }

    public draw(ctx:CanvasRenderingContext2D, offsetX:number, offsetY:number):void{
        if(this.isPlayingAnimation){
            if(this.visible){
                let x:number = this.x + offsetX,
                    y:number = this.y + offsetY;

                let afd = this._animations[this.currentAnimation][this.currentFrame];

                ctx.save();
                ctx.globalAlpha = this.alpha;

                ctx.drawImage(
                    this.image, afd.clipX, afd.clipY, afd.clipWidth, afd.clipHeight,
                    x, y, this.width, this.height
                );

                ctx.restore();
            }
        }
        else super.draw(ctx, offsetX, offsetY);
    }

    public nextFrame():void{
        if(++this._currFrame >= this.getLastAnimFrameIndex()){
            this._currFrame = 0;
        }
    }

    public prevFrame():void{
        if(--this._currFrame < 0){
            this._currFrame = this.getLastAnimFrameIndex();
        }
    }

    public stop():void{
        this._animating = false;
    }

    public playAnimation(animation:string):boolean{
        if(this.hasAnimation(animation) && this.currentAnimation !== animation){
            this._currAnim = animation;
            this._currFrame = 0;
            this._animating = true;
            return true;
        }
        return false;
    }

    public hasAnimation(animation:string):boolean{
        return animation in this._animations;
    }

    public setAnimation(animation:string, frames:AnimationFrameData[]):void{
        this._animations[animation] = frames;
    }

    private getAnimationFrames():AnimationFrameData[]{
        return this.currentAnimation ? this._animations[this.currentAnimation] : null;
    }

    private getLastAnimFrameIndex():number{
        let frames:AnimationFrameData[] = this.getAnimationFrames();
        return frames ? (frames.length - 1) : 0;
    }
    
    public get currentFrame():number{
        return this._currFrame;
    }

    public get currentAnimation():string{
        return this._currAnim;
    }

    public get isPlayingAnimation():boolean{
        return this._animating;
    }

    public static create(opts:SpriteConfig):AnimatedSprite{
        return new AnimatedSprite(opts.url, opts.width, opts.height, opts.depth, opts.x, opts.y);
    }
}
