import { Settings, GameState, UIState } from "./define";

export const CONST = {
  virtualCanvasWidth: 800,
  virtualCanvasHeight: 600,
  virtualBallSize: 16,
  virtualPaddleWidth: 15,
  virtualPaddleHeight: 120,
  virtualPaddleOffset: 30,
  trailLength: 10,
  minAlphaTrail: 0.1,
  minSizeTrail: 0.4,
  ballDXTable: [-4, 4],
  ballDYTable: [-4, -3, -2, 0, 2, 3, 4],
  inputKeys: new Set(["ArrowUp", "ArrowDown", "Space"]),
  minPaddleSpeed: 200,
  maxPaddleSpeed: 800,
  paddleSpeedStep: 1,
  minBallSpeed: 60,
  maxBallSpeed: 180,
  ballSpeedStep: 1,
  minWinningScore: 1,
  maxWinningScore: 20,
  winningScoreStep: 1,
  autoServeDelayMin: 0,
  autoServeDelayMax: 3,
  autoServeDelayStep: 0.2,
  netWidth: 2,
  netDashLength: 20,
  netDashGap: 15,
  netAlpha: 0.35,
} as const;

export const defaultSettings: Settings = {
  leftPaddleSpeed: 500,
  rightPaddleSpeed: 500,
  ballSpeed: 120,
  autoServe: false,
  autoServeDelay: 1,
  mouse: true,
  trail: false,
  winningScore: 5,
};

export function getInitialGameState(): GameState {
  return {
    ball: {
      x: CONST.virtualCanvasWidth / 2,
      y: CONST.virtualCanvasHeight / 2,
      dx: -4,
      dy: 0,
    },
    trail: [],
    leftPaddle: {
      x: 0,
      y: 0,
    },
    rightPaddle: {
      x: 0,
      y: 0,
    },
    autoServeTimer: 0,
  };
}

export function getInitialUIState(): UIState {
  return {
    menu: "start",
    prevMenu: null,
    leftScore: 0,
    rightScore: 0,
    settings: { ...defaultSettings },
  };
}
