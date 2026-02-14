import { RefObject, Dispatch } from "react";
import { UIState, UIAction, GameState } from "@/pong/define";
import { resetGame } from "@/pong/utils";
import { toggleFullScreen } from "@/pong/utils";

export default function ControlBar({
  controlBarRef,
  gameState,
  uiState,
  dispatch,
  fullscreenTargetRef,
}: {
  controlBarRef: RefObject<HTMLDivElement | null>;
  gameState: RefObject<GameState>;
  uiState: UIState;
  dispatch: Dispatch<UIAction>;
  fullscreenTargetRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={controlBarRef}
      className="
      mx-auto flex justify-center gap-2
      bg-gradient-to-r from-sky-900 via-white/20 to-yellow-900
      border-x border-t border-white"
    >
      <button
        onClick={() => {
          resetGame(gameState.current!);
          dispatch({ type: "reset" });
        }}
        className="px-3 py-1 hover:bg-red-500/50 active:bg-red-500 active:scale-95 transition"
      >
        <img src="/pong/reset_button.png" alt="stop" className="w-6" />
      </button>
      <button
        onClick={() => {
          dispatch({ type: "startStop" });
        }}
        className="px-3 py-1 hover:bg-white/10 active:bg-white/20 active:scale-95 transition"
      >
        {uiState.menu === "playing" ? (
          <img src="/pong/stop_button.png" alt="pause" className="w-6" />
        ) : (
          <img src="/pong/play_button.png" alt="play" className="w-6" />
        )}
      </button>
      <button
        onClick={() => {
          dispatch({ type: "toggleOptions" });
        }}
        className="px-3 py-1 hover:bg-white/10 active:bg-white/20 active:scale-95 transition"
      >
        <img src="/pong/menu_button.png" alt="options" className="w-6" />
      </button>
      <button
        onClick={() => {
          const el = fullscreenTargetRef.current;
          if (el) void toggleFullScreen(el);
        }}
        className="px-3 py-1 hover:bg-white/10 active:bg-white/20 active:scale-95 transition"
      >
        <img src="/pong/full_screen_button.png" alt="full screen" className="w-6" />
      </button>
    </div>
  );
}
