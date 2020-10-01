
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
        height = Math.floor(width  / 1);
    }   
    else  {
        width  = Math.floor(height * 1);
    }
    // This sets the CSS of the DISPLAY canvas to resize it to the scaled height and width.
    ctx.canvas.style.height = height + 'px';
    ctx.canvas.style.width  = width  + 'px';
}