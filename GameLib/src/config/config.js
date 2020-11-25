
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