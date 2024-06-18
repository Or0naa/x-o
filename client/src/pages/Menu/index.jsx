import React, { useState } from 'react'
import Logo from '../../components/Logo'
import style from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { useGameStore, useUserStore } from '../../store'


export default function Menu() {
    const nav = useNavigate()
    const game = useGameStore(state => state.game)
    const setGame = useGameStore(state => state.setGame)
    const createGame = useGameStore(state => state.createGame)
    const [difficulty, setDifficulty] = useState(3)
    const user = useUserStore(state => state.user)  
    
    const handleComputerGame = () => {
        setGame({ type: "computer", difficulty: difficulty })
        createGame()
        nav('/settings')
    }
    
    const handleFriendGame = () => {
        setGame({ type: "friend", difficulty: difficulty })
        createGame()
        nav('/joinToGame')
    }

    return (
        <div>
            <div className={style.header}>
                <Logo />
            </div>
            <div className={style.menu}>
                <button onClick={handleComputerGame}>play solo</button>
                <button onClick={handleFriendGame}>play with friend</button>
            </div>
          {user.isHost || !game.type &&  <div className={style.setDifficulty}>Level of difficulty
                <button className={difficulty==3? style.difficulty : style.not} onClick={()=>setDifficulty(3)}>easy</button>
                <button className={difficulty==4? style.difficulty : style.not} onClick={()=>setDifficulty(4)}>medium</button>
                <button className={difficulty==5? style.difficulty : style.not} onClick={()=>setDifficulty(5)}>Hard</button>
            </div>}
            <img onClick={() => nav('/settings')} className={style.button} src="./settings.png" alt="" />

        </div>
    )

}
