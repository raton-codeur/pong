import { state, GameState, CONFIG, options, DOM } from "./define.js";
import { endGame, resetBall, waitServe } from "./utils.js";
export function moveBall(deltaTime) {
    if (state.gameState !== GameState.Playing)
        return;
    let nextBall = {
        x: state.ball.x + state.ball.dx * state.ball.speed * deltaTime,
        y: state.ball.y + state.ball.dy * state.ball.speed * deltaTime,
    };
    if (state.ball.dx < 0)
        moveLeft(nextBall);
    else
        moveRight(nextBall);
    if (state.gameState !== GameState.Playing)
        return;
    nextBall = {
        x: state.ball.x + state.ball.dx * state.ball.speed * deltaTime,
        y: state.ball.y + state.ball.dy * state.ball.speed * deltaTime
    };
    moveY(nextBall);
    state.trail.push({ x: state.ball.x, y: state.ball.y });
    if (state.trail.length > CONFIG.trailLength)
        state.trail.shift();
}
function moveLeft(nextBall) {
    const hitsLeftPaddle = state.ball.x >= state.leftPaddle.x + state.paddleWidth &&
        nextBall.x <= state.leftPaddle.x + state.paddleWidth &&
        nextBall.y + state.ball.size >= state.leftPaddle.y &&
        nextBall.y <= state.leftPaddle.y + state.paddleHeight;
    if (hitsLeftPaddle) {
        state.ball.x = state.leftPaddle.x + state.paddleWidth;
        state.ball.dx = CONFIG.ballDXTable[1];
        state.ball.dy = getNextDy(state.leftPaddle);
    }
    else if (nextBall.x <= 0) {
        state.rightScore++;
        if (state.rightScore >= options.winScore)
            endGame();
        else {
            resetBall();
            waitServe();
        }
    }
    else
        state.ball.x = nextBall.x;
}
function moveRight(nextBall) {
    const hitsRightPaddle = state.ball.x + state.ball.size <= state.rightPaddle.x &&
        nextBall.x + state.ball.size >= state.rightPaddle.x &&
        nextBall.y + state.ball.size >= state.rightPaddle.y &&
        nextBall.y <= state.rightPaddle.y + state.paddleHeight;
    if (hitsRightPaddle) {
        state.ball.x = state.rightPaddle.x - state.ball.size;
        state.ball.dx = CONFIG.ballDXTable[0];
        state.ball.dy = getNextDy(state.rightPaddle);
    }
    else if (nextBall.x + state.ball.size >= DOM.canvas.width) {
        state.leftScore++;
        if (state.leftScore >= options.winScore)
            endGame();
        else {
            resetBall();
            waitServe();
        }
    }
    else
        state.ball.x = nextBall.x;
}
function getNextDy(paddle) {
    let ratio = (state.ball.y + state.ball.size / 2 - paddle.y) / state.paddleHeight;
    if (ratio < 0)
        ratio = 0;
    else if (ratio >= 1)
        ratio = 0.9999;
    return CONFIG.ballDYTable[Math.floor(ratio * CONFIG.ballDYTable.length)];
}
function moveY(nextBall) {
    if (nextBall.y <= 0) {
        state.ball.y = 0;
        state.ball.dy = -state.ball.dy;
    }
    else if (nextBall.y + state.ball.size >= DOM.canvas.height) {
        state.ball.y = DOM.canvas.height - state.ball.size;
        state.ball.dy = -state.ball.dy;
    }
    else
        state.ball.y = nextBall.y;
}
