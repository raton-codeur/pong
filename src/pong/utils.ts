import { GameState } from "./define";
import { CONST } from "./config";

export async function toggleFullScreen(el: HTMLElement) {
  try {
    if (!document.fullscreenElement) await el.requestFullscreen();
    else await document.exitFullscreen();
  } catch (e) {
    console.error("fullscreen refused:", e);
  }
}

export function resetBall(gameState: GameState) {
  gameState.ball.x = CONST.virtualCanvasWidth / 2 - CONST.virtualBallSize / 2;
  gameState.ball.y = CONST.virtualCanvasHeight / 2 - CONST.virtualBallSize / 2;
  gameState.ball.dx = -4;
  gameState.ball.dy = 0;
  gameState.trail = [];
  gameState.trail.push({ x: gameState.ball.x, y: gameState.ball.y });
}

function resetPaddles(gameState: GameState) {
  gameState.leftPaddle.x = CONST.virtualPaddleOffset;
  gameState.leftPaddle.y = CONST.virtualCanvasHeight / 2 - CONST.virtualPaddleHeight / 2;
  gameState.rightPaddle.x =
    CONST.virtualCanvasWidth - CONST.virtualPaddleOffset - CONST.virtualPaddleWidth;
  gameState.rightPaddle.y = CONST.virtualCanvasHeight / 2 - CONST.virtualPaddleHeight / 2;
}

export function resetGame(gameState: GameState) {
  resetBall(gameState);
  resetPaddles(gameState);
}
