import { useRef, useEffect, useReducer } from "react";
import ControlBar from "@/components/pong/ControlBar";
import GameArea from "@/components/pong/GameArea";
import { GameState } from "@/pong/define";
import { getInitialGameState, getInitialUIState } from "@/pong/config";
import reducer from "@/pong/reducer";
import { resetGame } from "@/pong/utils";
import moveBall from "@/pong/moveBall";
import movePaddles from "@/pong/movePaddles";
import display from "@/pong/display";
import { getInitialInputState, attachInputListeners } from "@/pong/input";
import { CONST } from "@/pong/config";

export default function Pong() {
  // define
  const fullscreenTargetRef = useRef<HTMLDivElement>(null);
  const controlBarRef = useRef<HTMLDivElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [uiState, dispatch] = useReducer(reducer, undefined, getInitialUIState);
  const gameState = useRef<GameState>(getInitialGameState());
  const uiStateRef = useRef(uiState);
  useEffect(() => {
    uiStateRef.current = uiState;
  }, [uiState]);
  const inputsRef = useRef(getInitialInputState());

  // resize
  useEffect(() => {
    const controlBar = controlBarRef.current;
    const gameArea = gameAreaRef.current;
    const canvasWrapper = canvasWrapperRef.current;
    const canvas = canvasRef.current;
    if (!controlBar || !gameArea || !canvasWrapper || !canvas) return;
    const ASPECT = 4 / 3;

    const resize = () => {
      const { width: availableWidth, height: availableHeight } = gameArea.getBoundingClientRect();
      let width = availableWidth;
      let height = width / ASPECT;
      if (height > availableHeight) {
        height = availableHeight;
        width = height * ASPECT;
      }
      width = Math.floor(width);
      height = Math.floor(height);
      controlBar.style.width = `${width}px`;
      canvasWrapper.style.width = `${width}px`;
      canvasWrapper.style.height = `${height}px`;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      const scale = Math.min(width / CONST.virtualCanvasWidth, height / CONST.virtualCanvasHeight);
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(gameArea);
    resize();

    return () => resizeObserver.disconnect();
  }, []);
  //       const dpr = window.devicePixelRatio || 1;
  //       const { width: availableWidth, height: availableHeight } = p.gameArea.getBoundingClientRect();
  //       const ASPECT = 4 / 3;
  //       let CSSWidth = availableWidth;
  //       let CSSHeight = availableWidth / ASPECT;
  //       if (CSSHeight > availableHeight) {
  //         CSSHeight = availableHeight;
  //         CSSWidth = availableHeight * ASPECT;
  //       }
  //       p.canvasWrapper.style.width = `${Math.floor(CSSWidth)}px`;
  //       p.canvasWrapper.style.height = `${Math.floor(CSSHeight)}px`;

  //       let bufferWidth = CSSWidth * dpr;
  //       let bufferHeight = CSSHeight * dpr;

  //       p.canvas.width = Math.round(bufferWidth);
  //       p.canvas.height = Math.round(bufferHeight);

  //       const scale = Math.min(bufferWidth / CONST.virtualCanvasWidth, bufferHeight / CONST.virtualCanvasHeight);
  //       p.ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0);

  // event listeners
  useEffect(() => {
    if (!canvasRef.current) return;

    const detachInput = attachInputListeners(canvasRef.current, dispatch, inputsRef);

    return detachInput;
  }, [dispatch]);

  // run game
  useEffect(() => {
    if (!gameState.current || !uiStateRef.current) return;

    dispatch({ type: "reset" });
    resetGame(gameState.current);

    let animationID = 0;
    let previousTimestamp = 0;

    function checkAutoServe(deltaTime: number) {
      if (uiStateRef.current.menu === "waitingServe" && uiStateRef.current.settings.autoServe) {
        gameState.current.autoServeTimer += deltaTime;
        if (gameState.current.autoServeTimer >= uiStateRef.current.settings.autoServeDelay) {
          gameState.current.autoServeTimer = 0;
          dispatch({ type: "startStop", autoServe: true });
        }
      }
    }

    function gameLoop(timestamp: number) {
      if (!canvasRef.current) return;

      if (!previousTimestamp) previousTimestamp = timestamp;
      const deltaTime = Math.min(0.033, (timestamp - previousTimestamp) / 1000);
      previousTimestamp = timestamp;

      checkAutoServe(deltaTime);

      const menu = uiStateRef.current.menu;
      if (menu === "waitingServe" && uiStateRef.current.prevMenu === "gameOver") {
        resetGame(gameState.current);
        uiStateRef.current.prevMenu = null;
      }
      if (menu === "waitingServe" || menu === "playing")
        movePaddles(gameState.current, uiStateRef.current.settings, inputsRef.current, deltaTime);
      if (menu === "playing") moveBall(gameState.current, uiStateRef, deltaTime, dispatch);
      display(canvasRef.current, gameState.current, menu);

      animationID = requestAnimationFrame(gameLoop);
    }
    animationID = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationID);
  }, []);

  // JSX
  return (
    <div
      ref={fullscreenTargetRef}
      className="flex flex-col w-full max-w-[800px] min-w-0 mx-auto p-4"
    >
      <ControlBar
        controlBarRef={controlBarRef}
        gameState={gameState}
        uiState={uiState}
        dispatch={dispatch}
        fullscreenTargetRef={fullscreenTargetRef}
      />
      <GameArea
        gameAreaRef={gameAreaRef}
        canvasWrapperRef={canvasWrapperRef}
        canvasRef={canvasRef}
        uiState={uiState}
        dispatch={dispatch}
      />
    </div>
  );
}
