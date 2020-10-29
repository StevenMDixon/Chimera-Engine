
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
        //@Todo rendering layers
        // layerMap: {
        //         0: 'background',
        //         1: 'ground',
        //         2: 'entity',
        //         3: 'foreGround'
        // },
        systems: [],
        components: [],
        scale: 1,
        cameraOptions: {
             bounds: null,
             deadZone: {
                     x: 0,
                     y: 0
             },
             lookAhead: 0,
             damping: 1,
             smoothing: 1
        }
}