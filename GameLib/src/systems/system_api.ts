import Renderer from './renderer';
import Sound from './sound_handler';

import store from '../modules/store';

function api(){
    const renderer = new Renderer(store);
    const sound = new Sound(store);

    renderer.setup();

    return {
        ...renderer.getTools(),
        ...sound.getTools(),
        getStore: (key) => {
            //return store.getStore().access(key);
        },
        getCamera: () => {
            return store.getStore('engine').access('camera');
        },
        nextLevel: () =>{},
        nextScene: (scene) => store.getStore('engine').update('currentScene', scene)
    }
}

export default api;