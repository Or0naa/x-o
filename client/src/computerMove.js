//make the next move on tic tac toe
import check from "./checkWin";
import { useGameStore } from "./store";


export function computerMove(board, ai, human) {
    const updateGame = useGameStore.getState().updateGame;
    const game = useGameStore.getState().game;
    game.count = game.count - 1
    let newBoard = {}
    let computerMove = computerWins(board, newBoard, ai, human);
    if (computerMove) {
        updateGame(game, newBoard.i, newBoard.j, { sign: ai, name: "computer" })
        return;
    }
    let computerBlock = computerBestMove(board, newBoard, ai, human);
    if (computerBlock) {
        updateGame(game, newBoard.i, newBoard.j, { sign: ai, name: "computer" })
        return;
    }
    let computerRandom = randomMove(board, newBoard, ai, human);
    updateGame(game, newBoard.i, newBoard.j, { sign: ai, name: "computer" })
    return;
}

function computerWins(board, newBoard, ai, human) {
    let i = 0;
    let j = 0;
    let foundMove = false;
    while (i < board.length && !foundMove) {
        if (board[i][j].value === '') {
            board[i][j].value = ai;
            if (check(board, ai, i, j)) {
                newBoard.board = board;
                newBoard.i = i;
                newBoard.j = j;
                board[i][j].value = ''
                foundMove = true;
            }
            if (!foundMove) {
                board[i][j].value = ''
            }
        }
        j++;
        if (j >= board.length) {
            j = 0;
            i++;
        }
    }
    return foundMove ? newBoard : null;
}

function computerBestMove(board, newBoard, ai, human) {
    let i = 0;
    let j = 0;
    let foundMove = false;
    while (i < board.length && !foundMove) {
        if (board[i][j].value === '') {
            board[i][j].value = human;
            if (!check(board, human, i, j)) {
                board[i][j].value = '';
            } else {
                board[i][j].value = ai;
                newBoard.board = board;
                newBoard.i = i;
                newBoard.j = j;
                board[i][j].value = ''
                foundMove = true;
            }
        }
        j++;
        if (j >= board.length) {
            j = 0;
            i++;
        }
    }
    if (foundMove) return newBoard;
    return null;
}

function randomMove(board, newBoard, ai, human) {
    const isBoardFull = board.every(row => row.every(cell => cell.value !== ''));

    if (isBoardFull) {
        newBoard.i = -1
        newBoard.j = -1
        return newBoard; // Or handle this case as needed
    }
    let random = Math.floor(Math.random() * board.length * board.length);
    let i = Math.floor(random / board.length);
    let j = random % board.length;
    if (board[i][j].value === '') {
        board[i][j].value = ai;
        newBoard.board = board;
        newBoard.i = i;
        newBoard.j = j;
        board[i][j].value = ''

        return newBoard;
    }
    return randomMove(board, newBoard);
}


