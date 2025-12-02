import { state, GameState, options, DOM } from "./define.js";
import { pauseGame, resetGame, resize, waitServe, resumeGame } from "./utils.js";
const gameKeys = new Set(["Space", "KeyW", "KeyS", "ArrowUp", "ArrowDown", "KeyR"]);
window.addEventListener("resize", resize);
window.addEventListener("keydown", (e) => {
    if (!gameKeys.has(e.code))
        return;
    e.preventDefault();
    if (e.code === "Space") {
        if (!e.repeat) {
            if (state.gameState === GameState.Start)
                waitServe();
            else if (state.gameState === GameState.WaitingServe && !options.autoServe)
                resumeGame();
            else if (state.gameState === GameState.GameOver) {
                resetGame();
                waitServe();
            }
            else if (state.gameState === GameState.Playing)
                pauseGame();
            else if (state.gameState === GameState.Pause)
                resumeGame();
        }
    }
    else if (e.code === "KeyR") {
        if (!e.repeat)
            resetGame();
    }
    else
        state.paddleKeys.add(e.code);
});
window.addEventListener("keyup", (e) => state.paddleKeys.delete(e.code));
DOM.resetButton.addEventListener("click", resetGame);
DOM.playButton.addEventListener("click", () => {
    if (state.gameState === GameState.Start)
        waitServe();
    else if (state.gameState === GameState.GameOver) {
        resetGame();
        waitServe();
    }
    else if (state.gameState === GameState.Pause)
        resumeGame();
});
DOM.pauseButton.addEventListener("click", pauseGame);
DOM.fullScreenButton.addEventListener("click", () => {
    DOM.canvas.requestFullscreen();
    DOM.canvas.width = screen.width;
    DOM.canvas.height = screen.height;
});
DOM.canvas.addEventListener("mousemove", (e) => {
    if ((state.gameState === GameState.Playing || state.gameState === GameState.WaitingServe)
        && options.mouse) {
        const rectCanvas = DOM.canvas.getBoundingClientRect();
        const mouseYInCanvas = e.clientY - rectCanvas.top;
        if (mouseYInCanvas <= state.paddleHeight / 2)
            state.leftPaddle.y = 0;
        else if (mouseYInCanvas + state.paddleHeight / 2 > DOM.canvas.height)
            state.leftPaddle.y = DOM.canvas.height - state.paddleHeight;
        else
            state.leftPaddle.y = mouseYInCanvas - state.paddleHeight / 2;
    }
});
DOM.canvas.addEventListener("click", () => {
    if (options.mouse) {
        if (state.gameState === GameState.Start)
            waitServe();
        if (state.gameState === GameState.WaitingServe && !options.autoServe)
            resumeGame();
        else if (state.gameState === GameState.GameOver) {
            resetGame();
            waitServe();
        }
        else if (state.gameState === GameState.Playing)
            pauseGame();
        else if (state.gameState === GameState.Pause)
            resumeGame();
    }
});
