import gameObject from '../components/gameObject';
import components from '../components/gameObject';

/*
is this a good pattern?
   [
       {name: ?, values: ?}
   ]

*/

// write a function that takes in user input and composes a gameobject
function compose(componentList): gameObject[]{
    let t = new gameObject();
    componentList.forEach(item => {
            t.addComponent(new item.component(...item.values.split(",")));
    })
    return [t];
}


function objectFactory(){

    return {
        compose
    }
}


export default objectFactory();