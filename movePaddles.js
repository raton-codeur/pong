import { state, GameState, DOM, options } from "./define.js";
export function movePaddles(deltaTime) {
    if (state.gameState === GameState.Playing ||
        state.gameState === GameState.WaitingServe) {
        if (state.paddleKeys.has("KeyW"))
            movePaddle(state.leftPaddle, -1, deltaTime);
        if (state.paddleKeys.has("KeyS"))
            movePaddle(state.leftPaddle, 1, deltaTime);
        if (options.aiOpponent)
            moveAIPaddle(deltaTime);
        else {
            if (state.paddleKeys.has("ArrowUp"))
                movePaddle(state.rightPaddle, -1, deltaTime);
            if (state.paddleKeys.has("ArrowDown"))
                movePaddle(state.rightPaddle, 1, deltaTime);
        }
    }
}
function movePaddle(paddle, direction, deltaTime) {
    paddle.y += direction * state.paddleSpeed * deltaTime;
    if (paddle.y < 0)
        paddle.y = 0;
    else if (paddle.y + state.paddleHeight > DOM.canvas.height)
        paddle.y = DOM.canvas.height - state.paddleHeight;
}
function moveAIPaddle(deltaTime) {
    if (state.ball.dx <= 0)
        return;
    const paddleCenter = state.rightPaddle.y + state.paddleHeight / 2;
    const ballCenter = state.ball.y + state.ball.size / 2;
    const distance = ballCenter - paddleCenter;
    if (Math.abs(distance) < state.paddleHeight / 3)
        return;
    const direction = distance > 0 ? 1 : -1;
    movePaddle(state.rightPaddle, direction, deltaTime);
}
