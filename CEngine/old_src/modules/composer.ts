import gameObject from '../components/gameObject';
import {Component} from '../components/components';

// write a function that takes in user input and composes a gameobject
function compose(componentList): gameObject[] {
   return componentList.reduce((gameO, item) => {
            if(item['component']){
                gameO.addComponent(new item.component(...item.values.split(",")));
            }else if (item instanceof Component){
                gameO.addComponent(item);
            }
            return gameO;
    }, new gameObject())
}


function objectFactory(){
    return {
        compose
    }
}


export default objectFactory();