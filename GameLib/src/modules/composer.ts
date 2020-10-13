import gameObject from '../components/gameObject';
import {Component} from '../components/components';

// write a function that takes in user input and composes a gameobject
function compose(componentList): gameObject[]
{
    let t = new gameObject();
    componentList.forEach(item => {
        console.log(item)
            if(item['component']){
                t.addComponent(new item.component(...item.values.split(",")));
            }else if (item instanceof Component){
                console.log('r')
                t.addComponent(item);
            }
    })
    return [t];
}


function objectFactory(){
    return {
        compose
    }
}


export default objectFactory();