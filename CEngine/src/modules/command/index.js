import commandList from './commandList';


class Command {
    constructor(){
        this.commands = commandList;
    }

    addCommands(commands){
        this.commands = {...commands, ...this.commands};
    }
    
    execute(commandName, ...data){
        this.command[commandName](...data);
    }
}


export default Command;