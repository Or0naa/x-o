import React from 'react'
import style from './style.module.scss'

export default function PlayerView({ image, name, wins, sign }) {
  return (
    <div className={style.container}>
      <img className={style.image} src={image} alt={name} />
      <div className={style.player}>
        {sign == 'x' ? <img src="/x.png" alt="x" /> : <img src="/o.png" alt="o" />}
        <div className={style.wins}>Wins: {wins}</div>
     
      <div className={style.name}>{name}</div>
 </div>
    </div>
  )
}
