import React, { useState } from "react";
import Snake from "./components/Snake";

import "./App.css";

function App() {
  const [play, setPlay] = useState(false);
  const gameOver = (score) => {
    setPlay(false);
    console.log(score);
  };
  return (
    <div className="App">
      {!play ? (
        <button onClick={() => setPlay(true)}>Play Game</button>
      ) : (
        <Snake gameOver={gameOver} />
      )}
    </div>
  );
}

export default App;
