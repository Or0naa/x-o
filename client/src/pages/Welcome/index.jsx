import React from 'react'
import style from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo'

export default function Welcome() {
  const nav = useNavigate()
  return (
    <div onClick={() => nav('/menu')} className={style.welcome}>
      <img className={style.xUp} src="./x.png" alt="x" />
      <img className={style.xDown} src="./x.png" alt="x" />
      <img className={style.oUp} src="./o.png" alt="o" />
      <img className={style.oDown} src="./o.png" alt="o" />
     <Logo/>
    </div>
  )
}

