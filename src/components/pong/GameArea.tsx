import { RefObject, Dispatch } from "react";
import { UIState, UIAction } from "@/pong/define";
import CanvasOverlay from "./CanvasOverlay";
import { CONST } from "@/pong/config";

export default function GameArea({
  gameAreaRef,
  canvasWrapperRef,
  canvasRef,
  uiState,
  dispatch,
}: {
  gameAreaRef: RefObject<HTMLDivElement | null>;
  canvasWrapperRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  uiState: UIState;
  dispatch: Dispatch<UIAction>;
}) {
  return (
    <div ref={gameAreaRef} className="relative flex-1 items-center flex flex-col">
      <div ref={canvasWrapperRef} className="absolute border border-white">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block z-0 w-full h-full touch-none select-none"
        />
        <Net uiState={uiState} />
        <Scores uiState={uiState} />
        <CanvasOverlay uiState={uiState} dispatch={dispatch} />
      </div>
    </div>
  );
}

function Net({ uiState }: { uiState: UIState }) {
  if (uiState.menu === "waitingServe" || uiState.menu === "playing" || uiState.menu === "pause") {
    return (
      <div
        className="absolute z-10 pointer-events-none top-0 bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: CONST.netWidth,
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, ${CONST.netAlpha}) 0 ${CONST.netDashLength}px,
            transparent ${CONST.netDashLength}px ${CONST.netDashLength + CONST.netDashGap}px
          )`,
        }}
      />
    );
  }
  return null;
}

function Scores({ uiState }: { uiState: UIState }) {
  if (uiState.menu !== "start" && uiState.menu !== "options") {
    return (
      <div
        className={`absolute ${uiState.menu === "gameOver" ? "z-30" : "z-10"} pointer-events-none top-0 w-full flex justify-center mt-5 text-4xl gap-10`}
      >
        <span className="w-[2ch] text-right tabular-nums">{uiState.leftScore}</span>
        <span className="w-[2ch] text-left tabular-nums">{uiState.rightScore}</span>
      </div>
    );
  }
  return null;
}
