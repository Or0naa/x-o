import React, { useState } from 'react'
import style from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { useGameStore, useUserStore } from '../../store'

export default function ChooseIfYouX() {
  const [choosen, setChoosen] = useState("")
  const nav = useNavigate()
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const game = useGameStore(state => state.game)
  const setGame = useGameStore(state => state.setGame)
  const handlePlayersUpdate = useGameStore(state => state.handlePlayersUpdate)


  const handleChoose = (player) => {
    setChoosen(player);
    setUser({ ...user, sign: player }); // Update the user's sign directly
    const oponentSign = player === "x" ? "o" : "x";
    const playersToUpdate = [{ ...game.players[0], sign: player }, { ...game.players[1], sign: oponentSign }];

    console.log({ playersToUpdate });
    if (game.type === "friend" && game.roomId) {
      handlePlayersUpdate(game.roomId, playersToUpdate);
    }
    setGame({ ...game, players: playersToUpdate });
  };





  const handlePlay = () => {
    if (choosen === "") return

    nav('/game')
  }
  return (
    <div className={style.container}>
      <img onClick={() => nav('/menu')} className='back' src="back.png" alt="back" />
      <div className={style.title}>CHOOSE PLAYER</div>
      <div className={style.choose}>
        <div onClick={() => handleChoose('x')} className={choosen === "x" ? style.choosen : style.notChoosen}>
          <img src="x.png" alt="x" />
        </div>
        <div onClick={() => handleChoose('o')} className={choosen === "o" ? style.choosen : style.notChoosen}>
          <img src="o.png" alt="o" />
        </div>
      </div>
      <button onClick={handlePlay} className={style.play}>LETS PLAY</button>
    </div>
  )
}
