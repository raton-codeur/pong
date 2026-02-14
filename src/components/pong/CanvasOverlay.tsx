import { ReactNode, Dispatch } from "react";
import { UIAction, UIState } from "@/pong/define";
import { CONST } from "@/pong/config";

export default function CanvasOverlay({
  uiState,
  dispatch,
}: {
  uiState: UIState;
  dispatch: Dispatch<UIAction>;
}) {
  let content: ReactNode = null;

  switch (uiState.menu) {
    case "start":
      content = (
        <div className="flex-1 flex flex-col bg-black overflow-y-auto">
          <div className="mt-28 text-4xl text-center">PONG</div>
          <ul className="mt-20 ml-10 list-disc list-inside text-3xl space-y-4">
            <li>↑ : déplacer la raquette vers le haut</li>
            <li>↓ : déplacer la raquette vers le bas</li>
            <li>espace : start / pause / reprendre / servir</li>
          </ul>
        </div>
      );
      break;

    case "waitingServe":
      content = <div className="p-10 text-4xl overflow-hidden">service...</div>;
      break;

    case "pause":
      content = <div className="m-auto text-6xl overflow-hidden">PAUSE</div>;
      break;

    case "gameOver":
      if (uiState.leftScore > uiState.rightScore)
        content = (
          <div className="flex-1 flex bg-black overflow-hidden">
            <div className="m-auto text-6xl text-center ">vous avez gagné !</div>
          </div>
        );
      else
        content = (
          <div className="flex-1 flex bg-black overflow-hidden">
            <div className="m-auto text-6xl text-center ">vous avez perdu !</div>
          </div>
        );
      break;

    case "options":
      content = (
        <div className="flex-1 flex flex-col bg-black gap-3 p-4 overflow-y-auto">
          <div className="rounded-xl border border-white/20 bg-white/10 p-3 flex items-center gap-6">
            <label htmlFor="mouse">souris</label>
            <input
              id="mouse"
              type="checkbox"
              className="scale-150 align-middle"
              checked={uiState.settings.mouse}
              onChange={(e) => dispatch({ type: "setMouse", mouse: e.target.checked })}
            />
          </div>

          <div
            className={`rounded-xl border border-white/20  p-3 flex items-center gap-6
            ${uiState.settings.mouse ? "bg-white/30" : "bg-white/10"}`}
          >
            <span>vitesse de la raquette gauche</span>
            <input
              className="flex-1"
              type="range"
              min={CONST.minPaddleSpeed}
              max={CONST.maxPaddleSpeed}
              step={CONST.paddleSpeedStep}
              value={uiState.settings.leftPaddleSpeed}
              onChange={(e) =>
                dispatch({ type: "setLeftPaddleSpeed", leftPaddleSpeed: Number(e.target.value) })
              }
            />
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-3 flex items-center gap-6">
            <span>vitesse de la raquette droite</span>
            <input
              className="flex-1"
              type="range"
              min={CONST.minPaddleSpeed}
              max={CONST.maxPaddleSpeed}
              step={CONST.paddleSpeedStep}
              value={uiState.settings.rightPaddleSpeed}
              onChange={(e) =>
                dispatch({ type: "setRightPaddleSpeed", rightPaddleSpeed: Number(e.target.value) })
              }
            />
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-3 flex items-center gap-6">
            <span>vitesse de la balle</span>
            <input
              className="flex-1"
              type="range"
              min={CONST.minBallSpeed}
              max={CONST.maxBallSpeed}
              step={CONST.ballSpeedStep}
              value={uiState.settings.ballSpeed}
              onChange={(e) =>
                dispatch({ type: "setBallSpeed", ballSpeed: Number(e.target.value) })
              }
            />
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-3 flex items-center gap-6">
            <label htmlFor="autoServe">service automatique</label>
            <input
              id="autoServe"
              type="checkbox"
              className="scale-150 align-middle"
              checked={uiState.settings.autoServe}
              onChange={(e) => dispatch({ type: "setAutoServe", autoServe: e.target.checked })}
            />
          </div>

          <div
            className={`rounded-xl border border-white/20 bg-white/10 p-3 flex items-center gap-6
            ${uiState.settings.autoServe ? "bg-white/10" : "bg-white/30"}`}
          >
            <span>durée du service automatique</span>
            <input
              className="flex-1"
              type="range"
              min={CONST.autoServeDelayMin}
              max={CONST.autoServeDelayMax}
              step={CONST.autoServeDelayStep}
              value={uiState.settings.autoServeDelay}
              onChange={(e) =>
                dispatch({ type: "setAutoServeDelay", autoServeDelay: Number(e.target.value) })
              }
            />
            <span>{uiState.settings.autoServeDelay.toFixed(1)} s</span>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-3 flex items-center gap-6">
            <label htmlFor="trail">trainée de balle</label>
            <input
              id="trail"
              type="checkbox"
              className="scale-150 align-middle"
              checked={uiState.settings.trail}
              onChange={(e) => dispatch({ type: "setTrail", trail: e.target.checked })}
            />
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-3 flex items-center gap-6">
            <span>score de victoire</span>
            <input
              className="flex-1"
              type="range"
              min={CONST.minWinningScore}
              max={CONST.maxWinningScore}
              step={CONST.winningScoreStep}
              value={uiState.settings.winningScore}
              onChange={(e) =>
                dispatch({ type: "setWinningScore", winningScore: Number(e.target.value) })
              }
            />
            <span>{uiState.settings.winningScore}</span>
          </div>
        </div>
      );
      break;
  }

  return (
    <div
      className={`absolute inset-0 z-20 flex-1 flex text-white
      ${uiState.menu === "options" || uiState.menu === "start" ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {content}
    </div>
  );
}
