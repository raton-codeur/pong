import { ctx, state, CONFIG, DOM, GameState, options } from "./define.js";
export function display() {
    resetBackground();
    if (state.gameState === GameState.Start)
        write("press SPACE or click to start", DOM.canvas.width / 2, DOM.canvas.height / 2, "40px Arial", "center");
    else if (state.gameState === GameState.GameOver) {
        let message;
        if (options.aiOpponent) {
            if (state.leftScore >= options.winScore)
                message = "you win!";
            else
                message = "you lost!";
        }
        else {
            if (state.leftScore >= options.winScore)
                message = "left player wins!";
            else
                message = "right player wins!";
        }
        write(message, DOM.canvas.width / 2, DOM.canvas.height / 2 - 40, "40px Arial", "center");
        write("press SPACE or click to restart", DOM.canvas.width / 2, DOM.canvas.height / 2 + 20, "30px Arial", "center");
        writeScores();
    }
    else {
        drawNet();
        writeScores();
        drawPaddle(state.leftPaddle);
        drawPaddle(state.rightPaddle);
        drawBall();
        if (state.gameState === GameState.Pause)
            write("PAUSE", DOM.canvas.width / 2, DOM.canvas.height / 2, "40px Arial", "center");
        else if (state.gameState === GameState.WaitingServe) {
            if (options.autoServe)
                write("get ready...", DOM.canvas.width / 2, DOM.canvas.height / 2 + 80, "30px Arial", "center");
            else
                write("press SPACE or click to serve", DOM.canvas.width / 2, DOM.canvas.height / 2 + 80, "30px Arial", "center");
        }
    }
}
function resetBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, DOM.canvas.width, DOM.canvas.height);
}
function drawNet() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    for (let y = 0; y < DOM.canvas.height; y += 35)
        ctx.fillRect(DOM.canvas.width / 2 - 1, y, 2, 20);
}
function drawPaddle(paddle) {
    ctx.fillStyle = "white";
    ctx.fillRect(paddle.x, paddle.y, state.paddleWidth, state.paddleHeight);
}
function drawBall() {
    for (let i = 0; i < state.trail.length; i++) {
        const ratioI = (state.trail.length === 1) ? 1 : i / (state.trail.length - 1);
        const ratioAlpha = CONFIG.minAlphaTrail + (1 - CONFIG.minAlphaTrail) * ratioI;
        ctx.fillStyle = `rgba(255, 255, 255, ${ratioAlpha})`;
        const ratioSize = CONFIG.minSizeTrail + (1 - CONFIG.minSizeTrail) * ratioI;
        const size = state.ball.size * ratioSize;
        const offset = (state.ball.size - size) / 2;
        ctx.fillRect(state.trail[i].x + offset, state.trail[i].y + offset, size, size);
    }
}
function write(text, x, y, font, textAlign = "left") {
    ctx.fillStyle = "white";
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.fillText(text, x, y);
}
function writeScores() {
    write(state.rightScore.toString(), DOM.canvas.width / 2 + 20, 50, "40px Arial");
    write(state.leftScore.toString(), DOM.canvas.width / 2 - 20, 50, "40px Arial", "right");
}
