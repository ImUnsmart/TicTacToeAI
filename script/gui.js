class GUI {
    static drawBackground(ctx) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    static drawBackdrop(ctx) {
        ctx.fillStyle = "#333";
        for(let i = 0; i < 9; i++) {
            ctx.fillRect(8 + (i % 3) * 248, 8 + Math.floor(i / 3) * 248, 240, 240);
        }
    }

    static drawBoard(ctx, board) {
        ctx.font = "200px Arial";
        ctx.textAlign = "center";
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                if(board[i][j] == 'X')
                    ctx.fillStyle = "#ff6262";
                else
                    ctx.fillStyle = "#b6bfff";
                ctx.fillText(board[i][j], 125 + i * 250, 200 + j * 250);
            }
        }
    }

    static drawOverlay(ctx, result) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(50, canvas.height / 2 - 123, canvas.width - 100, 248);
        ctx.fillStyle = "#000";
        ctx.font = "72px Arial";
        ctx.textAlign = "Center";
        ctx.fillText(result, canvas.width / 2, canvas.height / 2 + 32);
    }
}