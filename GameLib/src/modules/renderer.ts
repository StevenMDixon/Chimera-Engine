import store from '../modules/store';

class Renderer{
    constructor(){
        
    }

    //@todo: work on this to change fonts and colors and styles
    public drawText(text: string, x: number, y: number, color?){
        const {ctx} = store.getStore('engine').access('ctx');
        ctx.fillStyle = color
        ctx.textAlign= 'center';
        ctx.textBaseLine = 'center';
        ctx.fillText(text, x, y);
    }

    public drawRect(x, y, w, h, color){
        const {ctx} = store.getStore('engine').access('ctx');
        let fs = ctx.fillStyle;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h)
        ctx.fillStyle = fs;
    }

    public drawCircle(x, y, r, color){
        const {ctx} = store.getStore('engine').access('ctx');
        let fs = ctx.fillStyle;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.closePath();
        //ctx.stroke();
        ctx.fill();
        ctx.fillStyle = fs;
    }
    
    public drawLine(p1x, p1y, p2x, p2y, color){
        const {ctx} = store.getStore('engine').access('ctx');
        let fs = ctx.strokeStyle
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.closePath();
        ctx.stroke();
        //ctx.fill();
        ctx.strokeStyle = fs;
    }

    public drawTriangle(p1x, p1y, p2x, p2y, p3x, p3y, color){
        const {ctx} = store.getStore('engine').access('ctx');
        let fs = ctx.fillStyle
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.lineTo(p3x, p3y);
        ctx.closePath();
        //ctx.stroke();
        ctx.fill();
        ctx.fillStyle = fs;
    }
} 