import React, { useEffect } from 'react'
import style from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { useGameStore, useUserStore } from '../../store'


export default function Join() {

    const nav = useNavigate()
    const createGame = useGameStore(state => state.createGame)
    const joinGame = useGameStore(state => state.joinGame)
    const user = useUserStore(state => state.user)
    const game = useGameStore(state => state.game)

    const handleJoin = (e) => {
        e.preventDefault()
        const roomId = e.target.elements[0].value
        joinGame(roomId, user)
    }

    useEffect(() => {
        if (game.players && game.players.length == 2) {
            nav('/settings')
       }
    }, [game]);

    const handleCreate = () => {
        nav('/waiting')
    }


    return (
        <div className={style.join_container}>
            <img className="back" onClick={() => nav('/menu')} src="back.png" alt="back" />
            <div className={style.join}>Join to a game
                <form className={style.join} onSubmit={(e) => handleJoin(e)}>
                <input type="text" placeholder='enter game code' />
                <button type='submit'>Join</button></form>
            </div>
            <div className={style.oneLine}>
                <div className={style.line}></div>
                or
                <div className={style.line}></div>
            </div>
            <button onClick={handleCreate} className={style.create}>Create a game</button>
        </div>
    )
}
