export class KeyManager{
    private _keys:{[key:string]: boolean};
    private _numKeys:number;
    public listening:boolean;

    constructor(element?:HTMLElement){
        this._keys = {};
        this._numKeys = 0;
        this.listening = true;

        if(!element){
            element = document.body;
        }

        element.addEventListener("keyup", this.handleKeyUp.bind(this));
        element.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    private handleKeyUp(evt:KeyboardEvent):void{
        if(this.listening){
            this.forceKeyUp(evt.key);
        }
    }

    private handleKeyDown(evt:KeyboardEvent):void{
        if(this.listening){
            this.forceKeyDown(evt.key);
        }
    }

    public forceKeyUp(key:string):void{
        if(this.isKeyDown(key)){
            delete this._keys[key];
            this._numKeys--;
        }
    }

    public forceKeyDown(key:string):void{
        if(this.isKeyUp(key)){
            this._keys[key] = true;
            this._numKeys++;
        }
    }

    public isKeyUp(key:string):boolean{
        return !(key in this._keys);
    }

    public isKeyDown(key:string):boolean{
        return key in this._keys;
    }

    public anyKeysUp(keys:string[]):boolean{
        for(let i:number = 0; i < this.numKeys; i++){
            if(this.isKeyUp(keys[i])){
                return true;
            }
        }
        return false;
    }

    public anyKeysDown(keys:string[]):boolean{
        for(let i:number = 0; i < this.numKeys; i++){
            if(this.isKeyDown(keys[i])){
                return true;
            }
        }
        return false;
    }

    public allKeysUp(keys:string[]):boolean{
        return !this.anyKeysDown(keys);
    }

    public allkeysDown(keys:string[]):boolean{
        return !this.anyKeysUp(keys);
    }

    public get numKeys():number{
        return this._numKeys;
    }
}