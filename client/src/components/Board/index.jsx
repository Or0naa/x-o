import React, { useEffect } from 'react';
import style from './style.module.scss';
import { useGameStore, useUserStore } from '../../store';
import { computerMove } from '../../computerMove';

export default function Board() {
  const game = useGameStore(state => state.game);
  const setGame = useGameStore(state => state.setGame);
  const user = useUserStore(state => state.user);
  const updateGame = useGameStore(state => state.updateGame);

  const handleMove = (i, j) => {
    const me = user.sign == game.turn ? "my" : "opponent";
    console.log(user, " | ", game.turn)
    console.log("Move", i, j, game.board[i][j].value, me);
    if (game.turn != user.sign) {
      return
    }
    updateGame(game, i, j, user);
  };

  useEffect(() => {
    if (game.type === "computer" && game.turn !== user.sign && game.winner === null) {
      const delay = 500; // משהה חצי שנייה (500 מילישניות)
  
      const makeComputerMove = () => {
        computerMove(game.board, game.players[1].sign, user.sign);
        setGame({ ...game, turn: user.sign });
      };
  
      setTimeout(makeComputerMove, delay);
    }
  }, [game, user.sign]);

  const getCellContent = (value) => {
    if (value === "x") return <img src="./x.png" alt="X" />;
    if (value === "o") return <img src="./o.png" alt="O" />;
    return null;
  };

  const getCellSize = () => {
    const baseSize = window.innerWidth <= 600 ? 4.8 : 6; 
    switch (game.difficulty) {
      case 3: return `${baseSize}rem`;
      case 4: return `${baseSize * 0.75}rem`;
      default: return `${baseSize * 0.57}rem`;
    }
  };

  return (
    <div className={style.container}>
      {game.board && game.board.map((line, i) => (
        <div className={style.line} key={i}>
          {line.map((cell, j) => (
            <div
              style={{ width: getCellSize(), aspectRatio: 1 / 1 }}
              className={`${style.cell} ${game.winner && !cell.isWinner ? style.winner : ""}`}
              key={j}
              onClick={() => handleMove(i, j)}
            >
              {getCellContent(cell.value)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
