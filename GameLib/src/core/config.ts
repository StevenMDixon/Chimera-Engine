
export const config = {
        debug: false,
        ctx: null,
        imageRoot: '/images',
        scenes: null,
        camera: null,
        totalTime: null,
        controllerEnabled: false,
        controllerMap: null,
        currentScene: '',
        layerMap: {
                0: 'background',
                1: 'ground',
                2: 'entity',
                3: 'foreGround'
        },
        systems: [],
        components: [],
        scale: 1,
        cameraBorder: 20
}