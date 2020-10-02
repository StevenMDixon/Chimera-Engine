import Renderer from './renderer';
import Sound from './sound_handler';



function api(store){
    const renderer = new Renderer(store);
    const sound = new Sound(store);

    return {
        ...renderer.getTools(),
        ...sound.getTools(),
        getStore: (key) => {
            return store.access(key);
        }
    }
}

export default api;