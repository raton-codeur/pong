import { Dispatch, RefObject } from "react";
import { GameState, UIAction, UIState, Paddle, Ball } from "./define";
import { CONST } from "./config";
import { resetBall } from "./utils";

export default function moveBall(
  gameState: GameState,
  uiStateRef: RefObject<UIState>,
  deltaTime: number,
  dispatch: Dispatch<UIAction>,
) {
  const uiState = uiStateRef.current;
  if (!uiState) return;
  let nextY = gameState.ball.y + gameState.ball.dy * uiState.settings.ballSpeed * deltaTime;
  moveY(gameState.ball, nextY);

  const nextX = gameState.ball.x + gameState.ball.dx * uiState.settings.ballSpeed * deltaTime;
  nextY = gameState.ball.y + gameState.ball.dy * uiState.settings.ballSpeed * deltaTime;

  if (gameState.ball.dx < 0) moveLeft(gameState, nextX, nextY, dispatch);
  else moveRight(gameState, nextX, nextY, dispatch);

  if (uiState.menu === "playing") {
    if (!uiState.settings.trail) gameState.trail = [];
    gameState.trail.push({ x: gameState.ball.x, y: gameState.ball.y });
    if (gameState.trail.length > CONST.trailLength) gameState.trail.shift();
  }
}

function moveY(ball: Ball, nextY: number) {
  if (nextY <= 0) {
    ball.y = 0;
    ball.dy = -ball.dy;
  } else if (nextY + CONST.virtualBallSize >= CONST.virtualCanvasHeight) {
    ball.y = CONST.virtualCanvasHeight - CONST.virtualBallSize;
    ball.dy = -ball.dy;
  } else ball.y = nextY;
}

function moveLeft(
  gameState: GameState,
  nextX: number,
  nextY: number,
  dispatch: Dispatch<UIAction>,
) {
  const hitsLeftPaddle =
    gameState.ball.x >= gameState.leftPaddle.x + CONST.virtualPaddleWidth &&
    nextX <= gameState.leftPaddle.x + CONST.virtualPaddleWidth &&
    nextY + CONST.virtualBallSize >= gameState.leftPaddle.y &&
    nextY <= gameState.leftPaddle.y + CONST.virtualPaddleHeight;

  if (hitsLeftPaddle) {
    gameState.ball.x = gameState.leftPaddle.x + CONST.virtualPaddleWidth;
    gameState.ball.dx = CONST.ballDXTable[1];
    gameState.ball.dy = getNextDy(gameState.leftPaddle, gameState.ball);
  } else if (nextX <= 0) {
    resetBall(gameState);
    dispatch({ type: "rightPlayerScores" });
  } else gameState.ball.x = nextX;
}

function moveRight(
  gameState: GameState,
  nextX: number,
  nextY: number,
  dispatch: Dispatch<UIAction>,
) {
  const hitsRightPaddle =
    gameState.ball.x + CONST.virtualBallSize <= gameState.rightPaddle.x &&
    nextX + CONST.virtualBallSize >= gameState.rightPaddle.x &&
    nextY + CONST.virtualBallSize >= gameState.rightPaddle.y &&
    nextY <= gameState.rightPaddle.y + CONST.virtualPaddleHeight;

  if (hitsRightPaddle) {
    gameState.ball.x = gameState.rightPaddle.x - CONST.virtualBallSize;
    gameState.ball.dx = CONST.ballDXTable[0];
    gameState.ball.dy = getNextDy(gameState.rightPaddle, gameState.ball);
  } else if (nextX + CONST.virtualBallSize >= CONST.virtualCanvasWidth) {
    resetBall(gameState);
    dispatch({ type: "leftPlayerScores" });
  } else gameState.ball.x = nextX;
}

function getNextDy(paddle: Paddle, ball: Ball) {
  let ratio = (ball.y + CONST.virtualBallSize / 2 - paddle.y) / CONST.virtualPaddleHeight;
  if (ratio < 0) ratio = 0;
  else if (ratio >= 1) ratio = 0.9999;
  return CONST.ballDYTable[Math.floor(ratio * CONST.ballDYTable.length)];
}
