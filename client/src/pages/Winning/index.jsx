import React, { useEffect } from 'react';
import style from './style.module.scss';
import { useGameStore } from '../../store';
import Board from '../../components/Board';
import PlayerView from '../../components/PlayerView';
import { socket } from '../../socket';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

export default function Winning() {
    const game = useGameStore(state => state.game);
    const setGame = useGameStore(state => state.setGame);
    const winner = game.players.find(player => player.name === game.winner);
    const nav = useNavigate(); // Initialize navigate function

    const handlePlayAgain = () => {
        const playersToUpdate = game.players.map(player => {
            if (player.name === game.winner && game.winner == UserActivation.name) {
                player.wins = Number(player.wins) + 1;
            }
            return player;
        });

        if (game.type === "friend" && game.roomId) {
            const newGameState = {
                ...game,
                players: playersToUpdate,
                winner: null,
                count: game.difficulty * game.difficulty,
                board: game.board.map(row => row.map(cell => ({ value: "" }))), // Reset the board
                turn: "x" // Reset the turn
            };
            socket.emit('move', game.roomId, newGameState);
            setGame(newGameState);
            nav('/game');
        } else {
            setGame({
                ...game,
                players: playersToUpdate,
                winner: null,
                count: game.difficulty * game.difficulty,
                board: game.board.map(row => row.map(cell => ({ value: "" }))), // Reset the board
                turn: "x" // Reset the turn
            });
            nav('/game');
        }
    };

    const handleRestart = () => {
        setGame("");
        nav('/menu');
    };

    useEffect(() => {
        if (game.winner == null) {
            nav('/game')
        }
    }, [game])

    return (
        <div className={style.container}>
            <header>
                <div className="orangeUp"></div>
                <div className="orangeDown"></div>
                <div className={style.yellow}>
                    {winner && (
                        <>
                            <PlayerView name={winner.name} image={winner.avatar} wins={Number(winner.wins)+1} sign={winner.sign} />
                            {winner.name} wins!!
                        </>
                    )}
                    {game.winner=="tie"&&<p>tie!!</p>}
                </div>
            </header>
            <div className={style.board}>
                <Board />
            </div>
            <footer>
                <button className={style.button} onClick={handlePlayAgain}>Play Again</button>
                <button className={style.button} onClick={handleRestart}>Back to Main</button>
            </footer>
        </div>
    );
}
