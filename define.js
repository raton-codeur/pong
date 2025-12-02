export const CONFIG = {
    maxCanvasWidth: 1920,
    maxCanvasHeight: 1440,
    minCanvasWidth: 640,
    minCanvasHeight: 480,
    trailLength: 10,
    minAlphaTrail: 0.1,
    minSizeTrail: 0.4,
    ballDXTable: [-4, 4],
    ballDYTable: [-4, -3, -2, 0, 2, 3, 4]
};
export const options = {
    autoServe: false,
    aiOpponent: true,
    mouse: true,
    trail: true,
    serveTime: 1,
    winScore: 1,
    powerUps: false,
    multiBall: false
};
export var GameState;
(function (GameState) {
    GameState[GameState["Start"] = 0] = "Start";
    GameState[GameState["WaitingServe"] = 1] = "WaitingServe";
    GameState[GameState["Playing"] = 2] = "Playing";
    GameState[GameState["Pause"] = 3] = "Pause";
    GameState[GameState["GameOver"] = 4] = "GameOver";
})(GameState || (GameState = {}));
export const state = {
    leftPaddle: { x: 0, y: 0 },
    rightPaddle: { x: 0, y: 0 },
    paddleWidth: 0,
    paddleHeight: 0,
    paddleSpeed: 0,
    paddleOffset: 0,
    ball: { x: 0, y: 0, dx: 0, dy: 0, size: 0, speed: 0 },
    trail: [],
    leftScore: 0,
    rightScore: 0,
    gameState: GameState.Start,
    serveTimer: 0,
    paddleKeys: new Set()
};
export const DOM = {
    wrapper: document.getElementById("pong-wrapper"),
    canvas: document.getElementById("pong-canvas"),
    resetButton: document.getElementById("pong-reset-button"),
    playButton: document.getElementById("pong-play-button"),
    pauseButton: document.getElementById("pong-pause-button"),
    fullScreenButton: document.getElementById("pong-full-screen-button")
};
export const ctx = DOM.canvas.getContext("2d");
