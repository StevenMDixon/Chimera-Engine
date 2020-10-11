import Vector from '../modules/vector';


function primitives(ctx){
    return {
    //@todo: work on this to change fonts and colors and styles
    drawText: (text: string, x: number, y: number, color?) => {
        ctx.fillStyle = color
        ctx.textAlign= 'center';
        ctx.textBaseLine = 'center';
        ctx.fillText(text, x, y);
    },

    drawRect: (x, y, w, h, color, fill, stroke) => {
        let reserve = null;
        
        if(fill){
            reserve = ctx.fillStyle
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h)
            ctx.fillStyle = reserve;
        }else if(stroke){
            reserve = ctx.strokeStyle;
            ctx.strokeStyle = color;
            ctx.strokeRect(x, y, w, h)
            ctx.strokeStyle = reserve;
        }
    },

    drawCircle: (x, y, r, color) => {
       
        let fs = ctx.fillStyle;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.closePath();
        //ctx.stroke();
        ctx.fill();
        ctx.fillStyle = fs;
    },
    
    drawLine: (p1x, p1y, p2x, p2y, color) => {
        let fs = ctx.strokeStyle
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.closePath();
        ctx.stroke();
        //ctx.fill();
        ctx.strokeStyle = fs;
    },

    drawTriangle : (p1x, p1y, p2x, p2y, p3x, p3y, color) =>{
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
    },

    drawPolygon: (color, fill, stroke, xOffset, yOffset, vertices) =>{
        let reserve = ctx.strokeStyle;
        ctx.strokeStyle = color;
        ctx.beginPath();
        //ctx.moveTo(x, y);
        vertices.forEach(v => {
            ctx.lineTo(v.x - xOffset, v.y - yOffset)
        })
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle = reserve
    }
}
}

function game(ctx){
    return {
        drawTile(img, tile, x, y, w, h){ 
            //Math.floor(.pos.x - Math.ceil(offset.x)), Math.floor(pos.y - Math.ceil(offset.y))
            ctx.drawImage(img, tile.x, tile.y, tile.w, tile.h, x, y, w, h);
        },
        drawSprite(img, sprite, x, y, w, h){
            ctx.drawImage(img, sprite.x, sprite.y, sprite.w, sprite.h, x, y, w, h);
        }
    }
}

function images(){
    
}


function Render_Factory(ctx){
    return function getRenderer(type){
        if(type === 'system'){
            return {
                ...primitives(ctx),
                ...game(ctx)
            }
        }
    
        if(type === 'user'){
            return {
                ...primitives(ctx)
            }
        }
    }
}


export default Render_Factory;