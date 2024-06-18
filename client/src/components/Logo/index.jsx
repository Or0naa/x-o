import React from 'react'
import style from './style.module.scss'


export default function Logo() {
  return (
    <div>
         <div className={style.logoBG}></div>
         <img className={style.logo} src="./logo.png" alt="logo" />
    </div>
  )
}
