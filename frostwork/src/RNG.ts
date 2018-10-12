namespace frostwork{
    export class RNG{
        private static lastInt:number = -1
        private static lastFloat:number = -1;
    
        public static nextInt(min:number, max:number, notLastInt:boolean=false):number{
            let num:number = Math.round(Math.random() * (max - min) + min);
    
            if(notLastInt && num === RNG.lastInt){
                return RNG.nextInt(min, max, true);
            }
    
            RNG.lastInt = num;
    
            return num;
        }
    
        public static nextFloat(min:number=0, max:number=1, decimals:number=2, notLastFloat:boolean=false):number{
            let num:number = parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
    
            if(notLastFloat && num === RNG.lastFloat){
                return RNG.nextFloat(min, max, decimals, true);
            }
    
            RNG.lastFloat = num;
    
            return num;
        }
    }
}