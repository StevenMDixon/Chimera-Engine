const particles = {
    1: {
        alpha: {
            list: [
                {
                    value: 1,
                    time: 0
                },
                {
                    value: 1,
                    time: 1
                }
            ],
            isStepped: false
        },
        scale: {
            list: [
                {
                    value: 1,
                    time: 0
                },
                {
                    value: 2,
                    time: 1
                }
            ],
            isStepped: false
        },
        color: {
            list: [
                {
                    value: "fb1010",
                    time: 0
                },
                {
                    value: "f5b830",
                    time: 1
                }
            ],
            isStepped: false
        },
        speed: {
            list: [
                {
                    value: 1,
                    time: 0
                },
                {
                    value: 50,
                    time: 1
                }
            ],
            isStepped: false
        },
        startRotation: {
            min: 0,
            max: 360
        },
        rotationSpeed: {
            min: 0,
            max: 0
        },
        lifetime: {
            min: 0.5,
            max: 0.5
        },
        frequency: 0.1,
        spawnChance: 1,
        particlesPerWave: 5,
        emitterLifetime: 0,
        maxParticles: 500,
        pos: {
            x: 100,
            y: 100
        },
        addAtBack: false,
        spawnType: "square",
        spawnCircle: {
            x: 0,
            y: 0,
            r: 10
        }
    }

}

export default particles;