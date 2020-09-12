import tiles from './assets/tiles.png';

const images = {
    tiles
}

const imageData = {
    tiles: {
        width: 16,
        height: 16,
        sheet: 'tiles',
        mapAlias: {
            0: [0,0],
            1: [0,1],
            2: [0,2],
            3: [0,3],
            4: [0,4]
        }
    },
    sprites: {
        player: {
            width: 16,
            height: 16,
            sheet: 'tiles',
            animationKeys: {
                idle: {
                    row: 0,
                    column: 0,
                    alength: 1
                },
            }
        }
    }
}

export  {images, imageData};