const pieces = [
    //i 
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    //l
    [
        [0,1,0],
        [0,1,0],
        [1,1,0]
    ],
    //j
    [
        [0,1,0],
        [0,1,0],
        [0,1,1]
    ],
    //z
    [   
        [0,0,0],
        [0,1,1],
        [1,1,0]
    ],
    //s
    [
        [0,0,0],
        [1,1,0],
        [0,1,1]
    ],
    //t
    [
        [0,0,0],
        [0,1,0],
        [1,1,1]
    ],
    //o
    [
        [1,1],
        [1,1]
    ]
]

const getPiece = () => {
// l, i, j, z, s, o, t

    const piece = Math.floor(Math.random() * pieces.length)

   return pieces[piece];

}


export default getPiece;