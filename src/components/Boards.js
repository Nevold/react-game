import React, { useState, useEffect } from 'react';
import Square from './Square';
import './Boards.css';
import setting from './img/setting.png';
import palette from './img/palette.png';
import ListColor from './ListColor';

const standoff = 'Ничья!';

function isWinnerPlayer(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    if (squares.filter((item) => item !== null).length === 9) {
      return standoff;
    }
  }
  return null;
}

function Board() {
  let [squares, setSquares] = useState(Array(9).fill(null));
  let [nextPlayer, setNextPlayer] = useState(true);
  let [history, setHistory] = useState([{ squaresSet: Array(9).fill(null) }]);
  let [stepNumber, setStepNumber] = useState(0);
  let [showClass, setShowClass] = useState(false);
  let [showClassColor, setShowClassColor] = useState(false);
  let [divStyle, setDivStyle] = useState({
    color: 'black',
  });

  function handleClick(i) {
    const historySet = history.slice(0, stepNumber + 1);
    const currentHistory = historySet[historySet.length - 1];
    const squaresSet = currentHistory.squaresSet.slice();

    if (isWinnerPlayer(squaresSet) || squaresSet[i]) {
      return;
    }

    squaresSet[i] = nextPlayer ? 'X' : 'O';

    setSquares(() => squaresSet);
    setNextPlayer(() => !nextPlayer);
    setStepNumber(() => history.length);
    setHistory(() =>
      history.concat([
        {
          squaresSet,
        },
      ])
    );
  }

  function handleShowClass() {
    setShowClass(!showClass);
  }

  function handleShowClassColor() {
    setShowClassColor(!showClassColor);
    console.log(showClassColor);
  }

  function stepTo(index) {
    setStepNumber(index);
    setNextPlayer(index % 2 === 0);
  }

  const current = history[stepNumber];
  const winner = isWinnerPlayer(current.squaresSet);

  let status;
  if (winner === 'X' || winner === 'O') {
    status = 'Выиграл игрок ' + winner;
  } else if (winner === standoff) {
    status = standoff;
  } else {
    status = `Ход игрока: ${nextPlayer ? 'X' : 'O'}`;
  }

  const steps = history.map((_, index) => {
    return (
      <li className="step" key={index} onClick={() => stepTo(index)}>
        {index ? 'Ход №' + index : 'Новая игра'}
      </li>
    );
  });

  function renderSquare(i) {
    return <Square value={current.squaresSet[i]} onClickButton={() => handleClick(i)} key={i} styles={divStyle} />;
  }
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyR') {
        setDivStyle({
          color: 'red',
        });
      }
      if (e.code === 'KeyB') {
        setDivStyle({
          color: 'black',
        });
      }
      if (e.code === 'KeyG') {
        setDivStyle({
          color: 'green',
        });
      }
      if (e.code === 'KeyS') {
        setDivStyle({
          color: 'silver',
        });
      }

      if (e.code === 'KeyY') {
        setDivStyle({
          color: 'yellow',
        });
      }
    });
  }, []);

  return (
    <div className="boards-wrapper">
      <div className="colorInfo">
        <div className={showClassColor ? 'infoOn' : 'infoOff'}>
          <ListColor />
        </div>
      </div>
      <div>
        <div className="status">{status}</div>
        <div className="square-wrapper" style={divStyle}>
          {squares.map((_, index) => renderSquare(index))}
        </div>
        <div className="settingWrapper">
          <div className="setting" onClick={() => handleShowClass()}>
            <img className="setImg" src={setting} alt="Настройки" />
          </div>
          <div className="settingColor" onClick={() => handleShowClassColor()}>
            <img className="setPalette" src={palette} alt="Цвет" />
          </div>
        </div>
      </div>
      <div className="gameInfo">
        <div className={showClass ? 'infoOn' : 'infoOff'}>
          <ol className="listStep">{steps}</ol>
        </div>
      </div>
    </div>
  );
}

export default Board;
