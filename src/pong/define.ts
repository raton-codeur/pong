export type Settings = {
  leftPaddleSpeed: number;
  rightPaddleSpeed: number;
  ballSpeed: number;
  autoServe: boolean;
  autoServeDelay: number;
  mouse: boolean;
  trail: boolean;
  winningScore: number;
};

export type Ball = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

export type Paddle = {
  x: number;
  y: number;
};

export type Menu = "start" | "waitingServe" | "playing" | "pause" | "options" | "gameOver";

export type UIState = {
  menu: Menu;
  prevMenu: Menu | null;
  leftScore: number;
  rightScore: number;
  settings: Settings;
};

export type UIAction =
  | { type: "reset" }
  | { type: "startStop"; autoServe?: boolean }
  | { type: "toggleOptions" }
  | { type: "setLeftPaddleSpeed"; leftPaddleSpeed: number }
  | { type: "setRightPaddleSpeed"; rightPaddleSpeed: number }
  | { type: "setBallSpeed"; ballSpeed: number }
  | { type: "setAutoServe"; autoServe: boolean }
  | { type: "setAutoServeDelay"; autoServeDelay: number }
  | { type: "setMouse"; mouse: boolean }
  | { type: "setTrail"; trail: boolean }
  | { type: "setWinningScore"; winningScore: number }
  | { type: "leftPlayerScores" }
  | { type: "rightPlayerScores" };

export type GameState = {
  ball: Ball;
  trail: { x: number; y: number }[];
  leftPaddle: Paddle;
  rightPaddle: Paddle;
  autoServeTimer: number;
};

export type InputState = {
  up: boolean;
  down: boolean;
  pointerY: number;
};
