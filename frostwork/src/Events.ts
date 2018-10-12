import { EventEmitter } from "./EventEmitter";
import { Object2D } from "./Object2D";
import { Object2DContainer } from "./Object2DContainer";

export interface Event{
    type:string;
    emitter:EventEmitter;
}

export class Object2DEvent implements Event{
    private _type:string;
    private _target:Object2D;
    public emitter:EventEmitter;

    constructor(type:"click"|"move"|"resize"|"add"|"remove"|"add-child"|"remove-child", target:Object2D=null){
        this._type = type;
        this._target = target;
    }

    public get type():string{
        return this._type;
    }

    public get target():Object2D{
        return this._target;
    }
}