import React, { Component, useRef, useEffect, useState } from "react";

export const SnakePart = (props) => {};

const getRandomCoordinates = (width = 600, height = 600) => {
  return [
    Math.floor(Math.random() * Math.floor(width / 30)),
    Math.floor(Math.random() * Math.floor(height / 30)),
  ];
};

export const Snake = (props) => {
  const canvasRef = useRef(null);
  const [intervalId, setIntervalId] = useState(null);
  const [time, setTime] = useState(null);
  const [canvasSize, setCanvasSize] = useState(null);
  const [direction, setDirection] = useState("UP");
  const [snake, setSnake] = useState([
    [15, 10],
    [14, 10],
    [13, 10],
  ]);
  const [food, setFood] = useState(getRandomCoordinates());
  const [score, setScore] = useState(1);
  const [gameOver, setGameOver] = useState(1);

  const stopGame = () => {
    setGameOver(true);
    console.log("Game Over");
    clearInterval(intervalId);
    props.gameOver(score - 1);
  };

  const drawSnake = (ctx) => {
    ctx.fillStyle = "green";
    snake.map((part) => {
      ctx.fillRect(part[0] * 30, part[1] * 30, 29, 29);
    });
  };

  const drawFood = (ctx) => {
    ctx.fillStyle = "orange";
    ctx.fillRect(food[0] * 30, food[1] * 30, 29, 29);
  };

  const moveSnake = () => {
    if (direction == "RIGHT") {
      setSnake((prev) => {
        let tmp = [...prev];
        const head = tmp[0];
        const newHead = [head[0] + 1, head[1]];
        tmp.pop();
        tmp.unshift(newHead);
        return tmp;
      });
    } else if (direction == "LEFT") {
      setSnake((prev) => {
        let tmp = [...prev];
        const head = tmp[0];
        const newHead = [head[0] - 1, head[1]];
        tmp.pop();
        tmp.unshift(newHead);
        return tmp;
      });
    } else if (direction == "UP") {
      setSnake((prev) => {
        let tmp = [...prev];
        const head = tmp[0];
        const newHead = [head[0], head[1] - 1];
        tmp.pop();
        tmp.unshift(newHead);
        return tmp;
      });
    } else {
      setSnake((prev) => {
        let tmp = [...prev];
        const head = tmp[0];
        const newHead = [head[0], head[1] + 1];
        tmp.pop();
        tmp.unshift(newHead);
        return tmp;
      });
    }
  };

  const checkCollision = () => {
    // The snake eats
    if (snake[0][0] === food[0] && snake[0][1] === food[1]) {
      setSnake((prev) => {
        let tmp = [...prev];
        let last = tmp[tmp.length - 1];
        if (direction == "RIGHT") {
          tmp.push([last[0] - 1, last[1]]);
          return tmp;
        } else if (direction == "LEFT") {
          tmp.push([last[0] + 1, last[1]]);
          return tmp;
        } else if (direction == "UP") {
          tmp.push([last[0], last[1] + 1]);
          return tmp;
        } else {
          tmp.push([last[0], last[1] - 1]);
          return tmp;
        }
      });
      setFood(getRandomCoordinates(canvasSize[0], canvasSize[1]));
      setScore((prev) => {
        return prev + 1;
      });
      console.log(score);
    }

    // The snake bites itself
    const head = snake[0];
    snake.slice(1).forEach((part) => {
      if (part[0] === head[0] && part[1] === head[1]) {
        stopGame();
      }
    });

    // The snake hits a wall
    if (canvasSize != null) {
      const hitsWall = [
        head[0] > canvasSize[0] / 30,
        head[0] < 0,
        head[1] > canvasSize[1] / 30,
        head[1] < 0,
      ];
      if (hitsWall.some((cond) => cond)) {
        stopGame();
      }
    }
  };

  useEffect(() => {
    if (time == null) {
      setIntervalId(setInterval(() => setTime(Date.now), 100));
      setFood(getRandomCoordinates());
      document.addEventListener("keydown", (e) => {
        if (e.key === "j" || e.key === "ArrowDown") {
          setDirection((prev) => {
            if (prev !== "UP") {
              return "DOWN";
            }
            return prev;
          });
        }
        if (e.key === "k") {
          setDirection((prev) => {
            if (prev !== "DOWN") {
              return "UP";
            }
            return prev;
          });
        }
        if (e.key === "h") {
          setDirection((prev) => {
            if (prev !== "RIGHT") {
              return "LEFT";
            }
            return prev;
          });
        }
        if (e.key === "l") {
          setDirection((prev) => {
            if (prev !== "LEFT") {
              return "RIGHT";
            }
            return prev;
          });
        }
      });
    } else {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      setCanvasSize([ctx.canvas.width, ctx.canvas.height]);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawFood(ctx);
      drawSnake(ctx);
      moveSnake();
      checkCollision();
    }
  }, [time]);

  return (
    <canvas
      ref={canvasRef}
      style={canvasStyle}
      width="900px"
      height="600px"
    ></canvas>
  );
};

const canvasStyle = {
  border: "solid black 2px",
};

export default Snake;
