export class TokenGenerator{
    private static readonly CHAR_VALS:string[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQSTUVWXYZ1234567890".split("");

    private _tokenLength:number;
    private _tokens:{[token:string]: number};

    constructor(tokenLength:number){
        this._tokenLength = tokenLength;
        this._tokens = {};
    }

    public nextToken():string{
        let token:string = null;

        do{
            token = "";

            for(let i:number = 0; i < this.tokenLength; i++){
                token += TokenGenerator.CHAR_VALS[Math.random() % TokenGenerator.CHAR_VALS.length]
            }
        }
        while(this.tokenInUse(token));

        this._tokens[token] = 1;

        return token;
    }

    public releaseToken(token:string):boolean{
        return delete this._tokens[token];
    }

    public tokenInUse(token:string):boolean{
        return token in this._tokens;
    }

    public get tokenLength():number{
        return this._tokenLength;
    }
}   