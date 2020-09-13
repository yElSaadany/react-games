import React, { useState, useEffect } from "react";
import { getRandomCoordinates } from "../Snake/Snake";

export const Apple = (props) => {
  const [apple, setApple] = useState([300, 300]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(null);

  const getNewApple = () => {
    setApple(
      getRandomCoordinates(window.innerWidth, window.innerHeight, false)
    );
  };

  const gameOver = () => {
    console.log("Game Over");
    console.log(timer);
    window.clearInterval(timer);
    props.gameOver(score);
  };

  const handleAppleClick = (e) => {
    window.clearInterval(timer);
    setScore((prev) => {
      return prev + 1;
    });
    getNewApple();
    setTimer(setInterval(gameOver, 2000));
  };

  useEffect(() => {
    if (timer === null) {
      setApple(
        getRandomCoordinates((window.innerWidth, window.innerHeight, false))
      );

      setTimer(setInterval(gameOver, 2000));
    }
  }, [timer]);

  const getApplePosition = () => {
    return {
      position: "absolute",
      left: apple[0] + "px",
      top: apple[1] + "px",
    };
  };

  return (
    <div>
      {apple ? (
        <img
          style={getApplePosition()}
          onClick={handleAppleClick}
          width="50px"
          src="/apple.png"
        />
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Apple;

// https://www.zillow.com/homedetails/8744-Courtney-Ln-Mounds-OK-74047/2077892669_zpid/?
