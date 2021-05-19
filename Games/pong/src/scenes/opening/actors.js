 const actors = [
    {
        name: "player",
        transform : {
            position: {x: 100, y: 0},
            size: {w: 8, h: 8},
            scale: {x: 1, y: 1},
        },
        components: {
            State: "idle",
        },
        tags: ["Inputs", "Movable", "Player"],
        animation: {
            resource: "player",
            loop: true,
            speed: .5,
            anchor: .5,
            sheets: {
                one: [
                    {x: 0, y: 0, w: 8, h: 8},
                    {x: 8, y: 0, w: 8, h: 8}
                ],
                two: [
                    {x: 8 * 5, y: 0, w: 8, h: 8},
                    {x: 8 * 6, y: 0, w: 8, h: 8}
                ]
            }
        },
    }
];

export default actors;