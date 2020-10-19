import {Component} from 'GameLib';

const Components = [
    class Door extends Component {
        door: number;
        constructor({Door}){
            super()
            this.door = Door
        }
    },
    class Trigger extends Component {
        event: number;
        data: number | string;
        constructor({event, data}){
            super()
            this.event = event
            this.data = data
        }
    }
]

export default Components