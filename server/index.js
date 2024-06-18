const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: '*' } });

const rooms = {}; // The room ID where all players will join
const players = []; // רשימה לאחסון כל השחקנים

io.on('connection', (socket) => {
    socket.on('game:create-room', (game, userData) => {
        const newRoomId = generateRoomNumber();
        const newRoom = {
            game: game,
            players: [
                {
                    socketId: socket.id,
                    ...userData
                }
            ]
        }
        rooms[newRoomId] = newRoom;
        socket.join(newRoomId);
        console.log(`${userData.name} created room ${newRoomId}`);
        socket.emit('roomCreated', newRoomId);
    });

    socket.on('game:join-room', (roomId, userData) => {
        const room = rooms[roomId];
        if (room && room.players.length < 2) {
            room.players.push({
                socketId: socket.id,
                ...userData
            });
            room.game.roomId = roomId;
            socket.join(roomId);
            console.log(`${userData.name} joined room ${roomId}`);
            io.to(roomId).emit('game:join-success', room);
        } else {
            socket.emit('roomFull');
        }
    });

    socket.on('move', (roomId, game) => {
        console.log("move", roomId, game);
        const room = rooms[roomId];
        if (room) {
            room.game = game;
            io.to(roomId).emit('updateBoard', game);
            if (game.winner) {
                io.to(roomId).emit('game:end', game.winner);
                // console.log(game.winner, "nhbj")
            }
        }
    });

    socket.on('updatePlayerList', (roomId, playerList) => {
        const room = rooms[roomId];
        console.log(room)
        console.log('updatePlayerList', playerList, roomId);
        io.to(roomId).emit('updatePlayerList', playerList);
    });



socket.on('disconnect', () => {
    // console.log('user disconnected:', socket.id);
    const index = players.findIndex(player => player.id === socket.id);
    if (index !== -1) {
        players.splice(index, 1);
        io.to(roomID).emit('playerDisconnect', players);
    }
});
});

function generateRoomNumber() {
    return String(Math.floor(Math.random() * 100000));
}

server.listen(3000, () => console.log("Listening on port 3000"));
