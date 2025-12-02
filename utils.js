import { state, DOM, options, GameState } from "./define.js";
export function resize() {
    DOM.canvas.width = 800;
    DOM.canvas.height = 600;
    state.paddleHeight = 100;
    state.paddleWidth = 15;
    state.paddleSpeed = 400;
    state.paddleOffset = 30;
    state.ball.size = 15;
    state.ball.speed = 100;
    state.leftPaddle.x = state.leftPaddle.x;
    state.leftPaddle.y = state.leftPaddle.y;
    state.rightPaddle.x = state.rightPaddle.x;
    state.rightPaddle.y = state.rightPaddle.y;
    state.ball.x = state.ball.x;
    state.ball.y = state.ball.y;
}
export function resetPaddles() {
    state.leftPaddle.x = state.paddleOffset;
    state.leftPaddle.y = DOM.canvas.height / 2 - state.paddleHeight / 2;
    state.rightPaddle.x = DOM.canvas.width - state.paddleOffset - state.paddleWidth;
    state.rightPaddle.y = state.leftPaddle.y;
}
export function resetBall() {
    state.ball.x = DOM.canvas.width / 2 - state.ball.size / 2;
    state.ball.y = DOM.canvas.height / 2 - state.ball.size / 2;
    if (options.aiOpponent)
        state.ball.dx = -4;
    else
        state.ball.dx = Math.random() < 0.5 ? -4 : 4;
    state.ball.dy = 0;
    state.trail.length = 0;
    state.trail.push({ x: state.ball.x, y: state.ball.y });
}
export function resetGame() {
    resetPaddles();
    resetBall();
    state.trail.length = 0;
    state.leftScore = 0;
    state.rightScore = 0;
    showPlayButton();
    state.gameState = GameState.Start;
}
function showPlayButton() {
    DOM.playButton.style.display = "inline-block";
    DOM.pauseButton.style.display = "none";
}
function showPauseButton() {
    DOM.playButton.style.display = "none";
    DOM.pauseButton.style.display = "inline-block";
}
export function waitServe() {
    state.serveTimer = 0;
    state.gameState = GameState.WaitingServe;
}
export function resumeGame() {
    state.gameState = GameState.Playing;
    showPauseButton();
}
export function pauseGame() {
    state.gameState = GameState.Pause;
    showPlayButton();
}
export function endGame() {
    state.gameState = GameState.GameOver;
    showPlayButton();
}
export function checkAutoServe(deltaTime) {
    if (state.gameState === GameState.WaitingServe && options.autoServe) {
        state.serveTimer += deltaTime;
        if (state.serveTimer >= options.serveTime) {
            state.serveTimer = 0;
            resumeGame();
        }
    }
}
