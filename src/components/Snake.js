import React, { Component, useRef, useEffect, useState } from "react";

import "./snake.css";

export const SnakePart = (props) => {};

export const Snake = (props) => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([[5, 5]]);

  const drawSnake = (ctx) => {
    ctx.fillStyle = "green";
    snake.map((part) => {
      console.log(snake);
      ctx.fillRect(part[0] * 30, part[1] * 30, 30, 30);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    drawSnake(context);
  }, [snake]);

  return (
    <canvas ref={canvasRef} className="game-container" {...props}></canvas>
  );
};

export default Snake;
