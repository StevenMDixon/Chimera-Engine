
export function manageDPI(ctx){
    window.addEventListener('resize', (e) => resize(ctx, e));
    resize(ctx);
}

function resize(ctx, event?) {
    // Get the height and width of the window
    var height = document.documentElement.clientHeight;
    var width  = document.documentElement.clientWidth;
    // This makes sure the DISPLAY canvas is resized in a way that maintains the MAP's width / height ratio.
    if (width / height < 1){
        height = Math.floor(height  / 2);
    }   
    else  {
        width  = Math.floor(width * 1);
    }
    // This sets the CSS of the DISPLAY canvas to resize it to the scaled height and width.
    ctx.canvas.style.height = height + 'px';
    ctx.canvas.style.width  = width  + 'px';

    // get current size of the canvas
// let rect = ctx.canvas.getBoundingClientRect();

// // increase the actual size of our canvas
// ctx.canvas.width = rect.width * devicePixelRatio;
// ctx.canvas.height = rect.height * devicePixelRatio;

// // ensure all drawing operations are scaled
// ctx.scale(devicePixelRatio * 2, devicePixelRatio *2);

// // scale everything down using CSS
// ctx.canvas.style.width = rect.width + 'px';
// ctx.canvas.style.height = rect.height + 'px';
}