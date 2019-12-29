class AI {
    constructor(symbol) {
        this.symbol = symbol;
        this.oppositeSymbol = this.symbol == 'X' ? 'O' : 'X';
    }

    nextMove(board) {
        let move = this.findBestMove(board);
        if(move[0] == -1 || move[1] == -1)
            return;
        board[move[0]][move[1]] = this.symbol;
    }
    
    findBestMove(board) {
        let best = -1000;
        let brow = -1;
        let bcol = -1;

        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                if(board[i][j] == '') {
                    board[i][j] = this.symbol;
                    let moveVal = this.minimax(board, 0, !(this.symbol == 'X'));
                    board[i][j] = '';

                    if(moveVal > best) {
                        best = moveVal;
                        brow = i;
                        bcol = j;
                    }
                }
            }
        }
        console.log(best);
        return [brow, bcol];
    }

    movesLeft(board) {
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                if(board[i][j] == '')
                    return true;
            }
        }
        return false;
    }
    
    evaluate(board) {
        // Lines
        for(let i = 0; i < board.length; i++) {
            if(board[i][0] == board[i][1] && board[i][1] == board[i][2])
                if(board[i][0] == this.symbol)
                    return 10;
                else if(board[i][0] == this.oppositeSymbol)
                    return -10;
        }

        // Columns
        for(let j = 0; j < board[0].length; j++) {
            if(board[0][j] == board[1][j] && board[1][j] == board[2][j])
                if(board[0][j] == this.symbol)
                    return 10;
                else if(board[0][j] == this.oppositeSymbol)
                    return -10;
        }

        // Diaganols
        if(board[0][0] == board[1][1] && board[1][1] == board[2][2])
            if(board[0][0] == this.symbol)
                return 10;
            else if(board[0][0] == this.oppositeSymbol)
                return -10;

        if(board[0][2] == board[1][1] && board[1][1] == board[2][0])
            if(board[0][2] == this.symbol)
                return 10;
            else if(board[0][2] == this.oppositeSymbol)
                return -10;
        
        return 0;
    }

    minimax(board, depth, max) {
        let score = this.evaluate(board);
        
        if(score == 10 || score == -10)
            return score;
        
        if(!this.movesLeft(board))
            return 0;
        
        if(max) {
            let best = -1000;
            for(let i = 0; i < board.length; i++) {
                for(let j = 0; j < board[i].length; j++) {
                    if(board[i][j] == '') {
                        board[i][j] = 'X';
                        best = Math.max(best, this.minimax(board, depth+1, !max));
                        board[i][j] = '';
                    }
                }
            }
            return best;
        } else {
            let best = 1000;
            for(let i = 0; i < board.length; i++) {
                for(let j = 0; j < board[i].length; j++) {
                    if(board[i][j] == '') {
                        board[i][j] = 'O';
                        best = Math.min(best, this.minimax(board, depth+1, !max));
                        board[i][j] = '';
                    }
                }
            }
            return best;
        }
    }
}