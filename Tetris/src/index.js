import player from './player';

function setup(){
    const canvas = document.getElementById('tetris');
    const ctx = canvas.getContext('2d');
    ctx.scale(20,20);
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.clientWidth, canvas.height);
    return ctx;
}


function main() {
    const p = new player();
    const ctx = setup();
    console.log(p.piece)
    p.rotate();
    p.rotate();
    loop(ctx, p);
}


function loop(ctx, player) {
    //player.loc.y += 1;

    draw(ctx, player);
    requestAnimationFrame(() => loop(ctx, player));
}

function draw(ctx, player){
    const canvas = document.getElementById('tetris');
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.clientWidth, canvas.height);
    ctx.fillStyle = '#fff';
    for(let i = 0; i < player.piece.length; i++){
        for(let j = 0; j < player.piece[i].length; j++){
            if(player.piece[j][i] > 0){
                ctx.fillRect(player.loc.x + i, player.loc.y + j, 1, 1);
            }
        }
    }


}


main();