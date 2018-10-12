export class AssetsManager{
    private static audioCache:{[url:string]: HTMLAudioElement} = {};
    private static imageCache:{[url:string]: HTMLImageElement} = {};

    public static preloadAudio(urls:string[]):Promise<{errors:number, loaded:number}>{
        return new Promise((resolve, reject) => {
            let done:number = 0,
                loaded:number = 0,
                errors:number = 0;

            urls.forEach(url => {
                this.loadAudio(url)
                    .then(() => ++loaded)
                    .catch(() => ++errors)
                    .then(() => {
                        ++done;

                        if(done === urls.length){
                            resolve({errors, loaded});
                        }
                    })

            });
        });
    }

    public static preloadImages(urls:string[]):Promise<{errors:number, loaded:number}>{
        return new Promise((resolve, reject) => {
            let done:number = 0,
                loaded:number = 0,
                errors:number = 0;

            urls.forEach(url => {
                this.loadImage(url)
                    .then(() => ++loaded)
                    .catch(() => ++errors)
                    .then(() => {
                        ++done;

                        if(done === urls.length){
                            resolve({errors, loaded});
                        }
                    })

            });
        });
    }

    public static loadAudio(url:string):Promise<HTMLAudioElement>{
        return new Promise((resolve, reject) => {
            if(url in AssetsManager.audioCache){
                resolve(AssetsManager.audioCache[url]);
                return;
            }

            let audio:HTMLAudioElement = document.createElement("audio");
            audio.onload = () => resolve(audio);
            audio.onerror = err => reject(err);
            audio.setAttribute("src", url);
        });
    }

    public static loadImage(url:string):Promise<HTMLImageElement>{
        return new Promise((resolve, reject) => {
            if(url in AssetsManager.imageCache){
                resolve(AssetsManager.imageCache[url]);
                return;
            }

            let img:HTMLImageElement = document.createElement("img");
            img.onload = () => resolve(img);
            img.onerror = err => reject(err);
            img.setAttribute("src", url);
        });
    }
}