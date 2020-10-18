import {Component} from 'GameLib';

const Components = [
    class Door extends Component {
        door: number;
        constructor(door){
            super()
            this.door = door
        }
    },
    class Trigger extends Component {
        event: number;
        data: number | string;
        constructor(ev, data){
            super()
            this.event = ev;
            this.data = data;
        }
    }
]

export default Components