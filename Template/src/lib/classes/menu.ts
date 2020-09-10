import Entity from "./entity";

interface MenuOptions {
    x: number,
    y: number,
    optionsList: string[],
    cursor: boolean,
    buttons: object,
    fontSize?: number,
    vSpace?: number
}

class Menu extends Entity{
    options: string[] ;
    currentOption:  number;
    useCursor: boolean;
    mappedButtons: object;
    fontSize: number;
    vSpace: number;

    constructor({x, y, optionsList, cursor, buttons, fontSize, vSpace}: MenuOptions){
        super(x, y, 0, 0);
        this.options = optionsList;
        this.currentOption = 0;
        this.useCursor = cursor;
        this.mappedButtons = buttons;
        this.fontSize = fontSize || 10;
        this.vSpace = vSpace || 0;

    }

    draw(ctx: any): void{
        ctx.font = `${this.fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = 'top';
        let maxWidth = 0;
        this.options.forEach(option =>{
            if(ctx.measureText(option).width > maxWidth){
                maxWidth = ctx.measureText(option).width;
            }
        })
        if(this.useCursor){
            // todo: implement cursor
            let cursorOffset = this.currentOption * this.fontSize + (this.currentOption > 0 ? this.vSpace: 0) ;    
            ctx.beginPath();
            ctx.moveTo(this.x - maxWidth/2 - 10, this.y +  cursorOffset );
            ctx.lineTo(this.x - maxWidth/2 - 10, this.y  + this.fontSize + cursorOffset);
            ctx.lineTo(this.x + 5 - maxWidth/2 -10, this.y  + this.fontSize / 2 + cursorOffset);
            ctx.closePath();
            ctx.fill();

            this.options.forEach((option, index) =>{
                let yOffset = index * this.fontSize + (index > 0 ? this.vSpace: 0) ;                
                ctx.fillText(`${option}`, this.x, this.y + yOffset);
            })
        }
        else {
            this.options.forEach((option, index) =>{
                let yOffset =  index * this.fontSize + (index > 0 ? this.vSpace: 0) ;
                ctx.fillText(`${option}`, this.x, this.y + yOffset);
            })
        }
        
        
    }

    moveCursor(direction: string): void{
        if(direction == 'up'){
            // add boundaries
                this.currentOption -= 1;
            
            
        }
        if(direction == 'down'){
            // add boundaries
                this.currentOption +=1; 
        }
       
    }

    handleInput(keyCode: number){
        this.moveCursor(this.mappedButtons[keyCode])
    }
}

export default Menu;