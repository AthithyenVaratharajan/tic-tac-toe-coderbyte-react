import React, { useState } from "react";

const rowStyle = {
  display: "flex"
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white"
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid"
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px"
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px"
};

const Square = ({ value, onClick }) => {
  return (
    <div className="square" style={squareStyle} onClick={onClick}>
      {value}
    </div>
  );
};

const Board = () => {
  const [squares, setSquare] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const line = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < line.length; i++) {
      const [a, b, c] = line[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);

  const handleClick = (i) => {
    const squaresCopy = [...squares];
    if (winner || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = isNext ? "X" : "O";
    setSquare(squaresCopy);
    setIsNext(!isNext);
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Nexplayer: ${isNext ? "X" : "O"}`;
  }

  const reset = () => {
    setSquare(Array(9).fill(null));
    setIsNext(true);
  };

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        {status}
      </div>
      {/* {winner && (
        <div id="winnerArea" className="winner" style={instructionsStyle}>
          {status}
        </div>
      )} */}
      <button style={buttonStyle} onClick={reset}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
};

export default Board;
