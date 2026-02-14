import { GameState, Paddle } from "./define";
import { CONST } from "./config";

export default function display(canvas: HTMLCanvasElement, gameState: GameState, menu: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  resetCanvas(ctx);
  if (menu === "start" || menu === "options" || menu === "gameOver") return;
  let style: string;
  if (menu === "pause") style = "rgb(12, 74, 110)";
  else style = "rgb(113, 63, 18)";
  drawPaddle(ctx, gameState.leftPaddle, style);
  drawPaddle(ctx, gameState.rightPaddle, style);
  drawBalls(ctx, gameState.trail);
}

function resetCanvas(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CONST.virtualCanvasWidth, CONST.virtualCanvasHeight);
}

function drawPaddle(ctx: CanvasRenderingContext2D, paddle: Paddle, style: string) {
  ctx.fillStyle = style;
  ctx.fillRect(paddle.x, paddle.y, CONST.virtualPaddleWidth, CONST.virtualPaddleHeight);
}

function drawBalls(ctx: CanvasRenderingContext2D, trail: { x: number; y: number }[]) {
  for (let i = 0; i < trail.length; i++) {
    const ratioI = trail.length === 1 ? 1 : i / (trail.length - 1);
    const ratioAlpha = CONST.minAlphaTrail + (1 - CONST.minAlphaTrail) * ratioI;
    ctx.fillStyle = `rgba(255, 255, 255, ${ratioAlpha})`;
    const ratioSize = CONST.minSizeTrail + (1 - CONST.minSizeTrail) * ratioI;
    const size = CONST.virtualBallSize * ratioSize;
    const offset = (CONST.virtualBallSize - size) / 2;
    ctx.fillRect(trail[i].x + offset, trail[i].y + offset, size, size);
  }
}
