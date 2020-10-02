

function loader(store){

    return {
        load (name, asset){
            if(typeof asset == 'object' && asset.image){
                const {sheets = []} = store.access('sheets');
                store.set({
                    sheets: [...sheets, asset]
                })

                let fileName = asset.image.slice(asset.image.lastIndexOf('/') +1)

                name = [fileName.slice(0, fileName.lastIndexOf('.'))]

                handleImages(store, asset.image, name, false);
            }else if (typeof asset == 'object'){

            } else if (typeof asset == 'string' && asset.match(/.wav/g)){
                const {audio = {}} = store.access('audio');
                audio[name] = asset; 
                store.update('audio', audio);
            
            }else if (typeof asset == 'string' && asset.match(/.png/g)){
                handleImages(store, asset, name, true);
            }
        }
    }
}

function handleImages(store, imageSrc, name, isJustimg){
        const {imageRoot, images = {}, imageP = []} = store.access();
        const image = new Image();
        //load image from json file
        let t = new Promise((resolve, reject) => {
            image.addEventListener('load', () => {
                resolve({ikey: image});
            })
        })
        
        let imageSource = '';
        if(!isJustimg) imageSource = imageRoot + imageSrc.slice(imageSrc.lastIndexOf('/') );
        else  imageSource = imageSrc;

        image.src = imageSource;

        images[name] = image

        store.update('images', {...images});

        store.update('imageP', [...imageP, t]);
}



export default loader;