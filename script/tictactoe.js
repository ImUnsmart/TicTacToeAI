const canvas = document.getElementsByName('game')[0];
const ctx = canvas.getContext('2d');

let board = [ ['', '', ''], ['', '', ''], ['', '', ''] ];
let player = Math.random() < 0.5 ? 'X' : 'O';
let result = "";

let ai = new AI(player == 'X' ? 'O' : 'X');

function init() {
    setInterval(update, 1000 / 60);
    if(ai.symbol == 'X')
        ai.nextMove(board);
}

function draw() {
    GUI.drawBackground(ctx);
    GUI.drawBackdrop(ctx);
    GUI.drawBoard(ctx, board);
    if(result.length > 0)
        GUI.drawOverlay(ctx, result);
}

function update() {
    draw();
}

window.onload = function() {
    init();
}

function checkWin() {
    if(!ai.movesLeft(board)) {
        result = "TIE";
        return true;
    }
    if(ai.evaluate(board) == 10) {
        result = "AI WINS";
        return true;
    }
    if(ai.evaluate(board) == -10) {
        result = "PLAYER WINS";
        return true;
    }
    return false;
}

canvas.addEventListener('click', function(evt) {
    if(result.length > 0)
        return;
    let rect = canvas.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    let y = evt.clientY - rect.top;
    let i = Math.floor(x / 250);
    let j = Math.floor(y / 250);
    if(board[i][j] == '') {
        board[i][j] = player;
        if(checkWin())
            return;
        ai.nextMove(board);
        checkWin();
    }
});