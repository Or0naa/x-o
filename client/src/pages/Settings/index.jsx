import React, { useRef, useState } from 'react';
import style from './style.module.scss';
import Logo from '../../components/Logo';
import { useNavigate } from 'react-router-dom';
import { useGameStore, useUserStore } from '../../store';

export default function Settings() {
  const nav = useNavigate()
  const avatarsRef = useRef(null);

  const scrollLeft = () => {
    if (avatarsRef.current) {
      avatarsRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (avatarsRef.current) {
      avatarsRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const game = useGameStore(state => state.game)
  const setGame = useGameStore(state => state.setGame)
  const handlePlayersUpdate = useGameStore(state => state.handlePlayersUpdate)
  const [avatar, setAvatar] = useState(user.avatar ? user.avatar : 'woman.png');
  const [name, setName] = useState(user.name ? user.name : "player");
  console.log( user )


  const handleUpdateUser = () => {
    console.log({ avatar, name })
    setUser({ ...user, name: name, avatar: avatar })
    if (game.type == "friend" && game.roomId) {
      const playersToUpdate = game.players.map(player => {
        if (player.socketId == user.socketId) {
          player.name = name
          player.avatar = avatar
        }
        return player
      })
      console.log({playersToUpdate})
      handlePlayersUpdate(game.roomId, playersToUpdate)
      nav('/game')
    }
    else if (game.type == "computer") {
      setGame({ ...game, players: [{
                socketId: "1",
                name: name,
                avatar: avatar,
                isHost: true,
                wins: 0,
            },
                 { socketId: "computer", name: "computer", avatar: "robot.png", wins: 0 }] })
      nav('/choosePlayer')
    }
 
  }

  return (
    <div>
      <div className={style.logo}>
        <Logo />
      </div>
      <div className={style.container}>
        <div className={style.title}>Your name</div>
        <div className={style.name}>
          <input type="text" onChange={e => setName(e.target.value)} value={name} />
        </div>
        <div>
          <div className={style.avatar}>Choose avatar</div>
          <div className={style.avatars} ref={avatarsRef}>
            <img onClick={() => setAvatar("male.png")} src="male.png" alt="man" />
            <img onClick={() => setAvatar("female.png")} src="female.png" alt="woman" />
            <img onClick={() => setAvatar("woman.png")} src="woman.png" alt="woman" />
            <img onClick={() => setAvatar("man.png")} src="man.png" alt="woman" />
          </div>
          <img className={style.right} src="right.png" alt="right" onClick={scrollRight} />
          <img className={style.left} src="left.png" alt="left" onClick={scrollLeft} />
          <div>
            <img onClick={handleUpdateUser} className={`${style.back} ${style.v}`} src="v.png" alt="v" />
            <img onClick={() => nav(-1)} className={`${style.back} ${style.b}`} src="back.png" alt="back" />
          </div>
        </div>
      </div>
    </div>
  );
}
