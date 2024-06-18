import React, { useEffect } from 'react';
import { useGameStore } from '../../store';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';

export default function Waiting() {
    const game = useGameStore(state => state.game);
const nav = useNavigate()
    useEffect(() => {
        if (game.players && game.players.length == 2) {
            nav('/choosePlayer')
       }
    }, [game]);

    return (
        <div className={style.container}>
            <div className={style.title}>Your code</div>
            <div className={style.roomId}>{game.roomId}</div>
            <div>
                <svg role="img" aria-label="Mouth and eyes come from 9:00 and rotate clockwise into position, right eye blinks, then all parts rotate and merge into 3:00" className={style.smiley} viewBox="0 0 128 128">
                    <defs>
                        <clipPath id="smiley-eyes">
                            <circle className={style.smiley__eye1} cx="64" cy="64" r="8" />
                            <circle className={style.smiley__eye2} cx="64" cy="64" r="8" />
                        </clipPath>
                        <linearGradient id="smiley-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#000" />
                            <stop offset="100%" stopColor="#fff" />
                        </linearGradient>
                        <mask id="smiley-mask">
                            <rect x="0" y="0" width="128" height="128" fill="url(#smiley-grad)" />
                        </mask>
                    </defs>
                    <g strokeLinecap="round" strokeWidth="12" strokeDasharray="175.93 351.86">
                        <g>
                            <rect fill="#fbb500" width="128" height="64" clipPath="url(#smiley-eyes)" />
                            <g fill="none" stroke="#ffd414">
                                <circle className={style.smiley__mouth1} cx="64" cy="64" r="56" transform="rotate(180,64,64)" />
                                <circle className={style.smiley__mouth2} cx="64" cy="64" r="56" transform="rotate(0,64,64)" />
                            </g>
                        </g>
                        <g mask="url(#smiley-mask)">
                            <rect fill="#b58506" width="128" height="64" clipPath="url(#smiley-eyes)" />
                            <g fill="none" stroke="#b58506">
                                <circle className={style.smiley__mouth1} cx="64" cy="64" r="56" transform="rotate(180,64,64)" />
                                <circle className={style.smiley__mouth2} cx="64" cy="64" r="56" transform="rotate(0,64,64)" />
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <div className={style.wait}>Waiting for opponent</div>
        </div>
    );
}