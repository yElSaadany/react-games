import React, { useState } from "react";
import Snake from "./components/Snake/Snake";

import "./App.css";
import Apple from "./components/Apple/Apple";

function App() {
  const [playSnake, setPlaySnake] = useState(false);
  const [playApple, setPlayApple] = useState(false);
  const gameOver = (score) => {
    setPlaySnake(false);
    console.log(score);
  };
  const gameOverApple = (score) => {
    setPlayApple(false);
    console.log(score);
  };

  return (
    <div className="App">
      {!playSnake ? (
        <button onClick={() => setPlaySnake(true)}>Play Snake</button>
      ) : (
        <Snake gameOver={gameOver} />
      )}
      {!playApple ? (
        <button onClick={() => setPlayApple(true)}>Play Apple</button>
      ) : (
        <Apple gameOver={gameOverApple} />
      )}
    </div>
  );
}

export default App;
