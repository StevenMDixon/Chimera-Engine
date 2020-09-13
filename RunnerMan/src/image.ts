import tiles from './assets/tiles.png';
import bg from './assets/bg.png';
import player from './assets/player.png';
// if the image has a transaprent background it will be transparent.

const images = {
    tiles,
    bg,
    player
}

const imageData = {
    tiles: {
        width: 16,
        height: 16,
        sheet: 'tiles',
        // 0 is reserved for blank
        mapAlias: {
            1: [0,0],
            2: [1,0],
            3: [2,0],
            4: [3,0],
            5: [4,0],
            6: [5,0]
        }
    },
    sprites: {
        player: {
            width: 16,
            height: 16,
            sheet: 'player',
            animationKeys: {
                run: {
                    row: 0,
                    column: 0,
                    alength: 5
                },
                jump: {
                    row: 1,
                    column: 0,
                    alength: 1
                },
            }
        }
    }
}

export  {images, imageData};