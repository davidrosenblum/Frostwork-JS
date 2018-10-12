import { Event } from "./Events";

export class EventEmitter{
    private _eventListeners:{[eventType:string]: Array<(evt:Event)=>any>};

    constructor(){
        this._eventListeners = {};
    }

    public emit(event:Event):void{
        if(this.willTrigger(event.type)){
            this._eventListeners[event.type].forEach(listener => listener(event));
        }
    }

    public on(eventType:string, listener:(evt:Event)=>any):void{
        if(this.willTrigger(eventType)){
            this._eventListeners[eventType].push(listener);
        }
        else{
            this._eventListeners[eventType] = [listener];
        }
    }

    public off(eventType:string, listener:(evet:Event)=>any):boolean{
        if(this.willTrigger(eventType)){
            let listeners:Array<(evt:Event)=>any> = this._eventListeners[eventType];

            for(let i:number = 0; i < listeners.length; i++){
                if(listeners[i] === listener){
                    listeners.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }

    public removeListeners(eventType:string):boolean{
        return delete this._eventListeners[eventType];
    }

    public removeAllListeners():void{
        this._eventListeners = {};
    }

    public willTrigger(eventType:string):boolean{
        return eventType in this._eventListeners;
    }
}