import React, { useEffect } from 'react'
import { useGameStore } from '../../store'
import Board from '../../components/Board'
import style from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import PlayerView from '../../components/PlayerView'

export default function Game() {
    const game = useGameStore(state => state.game)
    console.log({ game })
    const nav = useNavigate()

    const player1 = game.players[0] ? {
        name: game.players[0].name,
        image: game.players[0].avatar,
        wins: game.players[0].wins,
        sign: game.players[0].sign
    } : {
        name: "Player1",
        image: "./man.png",
        wins: 0,
        sign: "x"
    }

    const player2 = game.players[1] ? {
        name: game.players[1].name,
        image: game.players[1].avatar,
        wins: game.players[1].wins,
        sign: game.players[1].sign
    } : {
        name: "Player2",
        image: "./woman.png",
        wins: 0,
        sign: "o"
    }

    useEffect(() => {
        if (game.winner != null) {
            nav('/win')
        }
    }, [game])


    return (
        <div className={style.container}>
            <header>
                <div className="orangeUp"></div>
                <div className="orangeDown"></div>
                <div className="yellow">
                    <PlayerView name={player1.name} image={player1.image} wins={player1.wins} sign={player1.sign} />
                    <PlayerView name={player2.name} image={player2.image} wins={player2.wins} sign={player2.sign} />
                </div>
            </header>
            <main><Board /></main>
            <footer>
                <button className={style.button} onClick={() => nav(-1)}>back</button>
                <img onClick={() => nav('/settings')} className={style.settings} src="./settings.png" alt="" />
            </footer>

        </div>
    )
}
