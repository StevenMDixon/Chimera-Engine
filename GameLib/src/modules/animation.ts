


// simple animations used for sprites
export function createAnimation(frames, length){
    return function resolveFrame(d){
        const index = Math.floor(d/ length) % frames.length;
        return frames[index];
    }
}



export function createTiledAnimation(frames, options){
    let direction = 'loop';
    if(options){
        options.forEach(op => op.name == 'direction'? direction = op.value[0]: '');
    }
    let ended = false;
    const totalFrameTime = frames.reduce((acc, cur)=>{return acc + cur.duration}, 0);

    return function resolveFrame(d, e){
        let clampedT = (d % totalFrameTime);
        let i = 0;
        
        frames.forEach(frame => {
            clampedT -= frame.duration;
            if(clampedT >= 0){ i += 1}
        })

        if(direction == 'forward' && !ended){
            if(i == frames.length -1) {ended = true}
        } else if (direction == 'forward' && ended) {
            i = frames.length - 1
            console.log(i)
        }

        return frames[i].tileid;
    }
}

