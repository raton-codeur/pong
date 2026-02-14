import { GameState, InputState, Paddle, Settings } from "./define";
import { CONST } from "./config";

export default function movePaddles(
  gameState: GameState,
  settings: Settings,
  input: InputState,
  deltaTime: number,
) {
  if (settings.mouse) movePlayerPaddleMouse(gameState, input.pointerY);
  else movePlayerPaddle(gameState, settings, input, deltaTime);
  moveAIPaddle(gameState, settings, deltaTime);
}

function movePaddle(paddle: Paddle, speed: number, direction: -1 | 1, deltaTime: number) {
  paddle.y += direction * speed * deltaTime;
  if (paddle.y < 0) paddle.y = 0;
  else if (paddle.y + CONST.virtualPaddleHeight > CONST.virtualCanvasHeight)
    paddle.y = CONST.virtualCanvasHeight - CONST.virtualPaddleHeight;
}

function movePlayerPaddle(
  gameState: GameState,
  settings: Settings,
  input: InputState,
  deltaTime: number,
) {
  if (input.up) movePaddle(gameState.leftPaddle, settings.leftPaddleSpeed, -1, deltaTime);
  if (input.down) movePaddle(gameState.leftPaddle, settings.leftPaddleSpeed, 1, deltaTime);
}

function moveAIPaddle(gameState: GameState, settings: Settings, deltaTime: number) {
  if (gameState.ball.dx <= 0) return;
  const paddleCenter = gameState.rightPaddle.y + CONST.virtualPaddleHeight / 2;
  const ballCenter = gameState.ball.y + CONST.virtualBallSize / 2;
  const distance = ballCenter - paddleCenter;
  if (Math.abs(distance) < CONST.virtualPaddleHeight / 2) return;
  const direction = distance > 0 ? 1 : -1;
  movePaddle(gameState.rightPaddle, settings.rightPaddleSpeed, direction, deltaTime);
}

function movePlayerPaddleMouse(gameState: GameState, mouseY: number) {
  const maxPaddleY = CONST.virtualCanvasHeight - CONST.virtualPaddleHeight;
  gameState.leftPaddle.y = Math.min(
    Math.max(0, mouseY - CONST.virtualPaddleHeight / 2),
    maxPaddleY,
  );
}
