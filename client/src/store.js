import check from './checkWin';
import { socket } from './socket';
import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
    user: {},
    setUser: (user) => {
        set({ user });
        const game = useGameStore.getState().game;
        if (game.type === "friend" && game.roomId) {
            socket.emit('updateUser', game.roomId, user);
        }
    },
}));

export const useGameStore = create((set, get) => ({
    game: {},
    setGame: (game) => set({ game }),
    createGame: () => {
        const game = get().game;
        const setGame = get().setGame;
        console.log(game);
        const user = useUserStore.getState().user;
        let newBoard = [];
        for (let i = 0; i < game.difficulty; i++) {
            const line = [];
            for (let j = 0; j < game.difficulty; j++) {
                line.push({ value: "" }); // Initialize the board with empty values
            }
            newBoard.push(line);
        }
        let newGame = {
            count: game.difficulty * game.difficulty,
            board: newBoard,
            winner: null,
            turn: "x",
            type: game.type,
            difficulty: game.difficulty,
        };
        if (game.type === "computer") {

            set({ game: newGame });
        } else if (game.type === "friend") {
            socket.connect();
            socket.emit('game:create-room', newGame, user);
            socket.on('roomCreated', (roomID) => {
                console.log('Room created', roomID);
                set({ game: { ...newGame, roomId: roomID } });
            });
            socket.on('game:join-success', (room) => {
                console.log('game:join-success', room);
                setGame({ ...room.game, players: room.players });
                useUserStore.getState().setUser({ ...user, isHost: true, socketId: room.players[0].socketId });
            });

        }
    },
    joinGame: (roomId, user) => {
        const setGame = get().setGame;
        socket.connect();
        socket.emit('game:join-room', roomId, user);
        socket.on('game:join-success', (room) => {
            // console.log('game:join-success', room);
            const newGameState = {
                ...room.game,
                roomId: roomId,
                players: room.players,
            };
            setGame(newGameState);
            useUserStore.getState().setUser({ ...user, socketId: room.players[1].socketId });

        });
        socket.on('roomFull', () => {
            console.log('roomFull');
        });
    },
    updateGame: (data, i, j, player) => {
        if (i == -1 || j == -1) {
            const game = get().game
            const newGameState = { ...game, winner: "tie" }
            if (data.type === "computer") {
                set({ game: newGameState })
            } else if (data.type === "friend") {
                socket.emit('move', data.roomId, newGameState);
            }

        }
        else if (data.board[i][j].value === "") {
            // console.log("empty")
            // Create a new board to avoid mutating state directly
            const newBoard = data.board
            newBoard[i][j].value = player.sign

            // Determine the next turn and other game updates
            const newTurn = data.turn === "x" ? "o" : "x";
            const newCount = data.type =="computer"? data.count - 2: data.count-1;

            let newWinner = data.winner;
            if (newCount <= 0) {
                newWinner = "tie";
                data.winner = "tie"
            }
            // Check for a winner (implement check function as needed)
            const winner = check(newBoard, player.sign, i, j);
            if (winner) {
                console.log("winner", winner);
                newWinner = player.name;
                data.winner = player.name;
                // Mark the winning cells (row, column, or diagonal)
                if (winner === "row") {
                    for (let k = 0; k < newBoard.length; k++) {
                        newBoard[k][j].isWinner = true;
                    }
                } else if (winner === "column") {
                    for (let k = 0; k < newBoard.length; k++) {
                        newBoard[j][k].isWinner = true;
                    }
                } else if (winner === "diagonaldown") {
                    for (let k = 0; k < newBoard.length; k++) {
                        newBoard[k][k].isWinner = true;
                    }
                } else if (winner === "diagonalup") {
                    for (let k = 0; k < newBoard.length; k++) {
                        newBoard[k][newBoard.length - k - 1].isWinner = true;
                    }
                }
            }

            const newGameState = {
                ...data,
                board: newBoard,
                turn: newTurn,
                count: newCount,
                winner: newWinner,
            };

            console.log({ newGameState })

            if (data.type === "computer") {
                set({ game: newGameState });
            } else if (data.type === "friend") {
                socket.emit('move', data.roomId, newGameState);
            }
        } else {
            console.error("The cell is already filled.");
        }
    },

    socketBoardUpdate: () => {
        socket.on('updateBoard', (data) => {
            const setGame = get().setGame
            console.log("moooooove", data)
            setGame(data)
        });
    },
    handlePlayersUpdate: (roomId, data) => {
        console.log(roomId)
        const game = get().game;
        const user = useUserStore.getState().user;
        const setUser = useUserStore.getState().setUser;
        socket.emit('updatePlayerList', roomId, data);
        socket.on('updatePlayerList', (playerList) => {
            console.log("coming playerList:", playerList);
            set(state => ({
                game: {
                    ...state.game,
                    players: playerList,
                }
            }));

            // Update the user's sign based on the new player list
            const updatedUser = playerList.find(player => player.socketId === user.socketId);
            if (updatedUser) {
                setUser({ ...user, sign: updatedUser.sign });
            }
        });
    },
}));


