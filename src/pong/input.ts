import { Dispatch, RefObject } from "react";
import { InputState, UIAction } from "./define";
import { CONST } from "./config";

export function getInitialInputState() {
  return {
    up: false,
    down: false,
    pointerY: CONST.virtualCanvasHeight / 2,
  };
}

export function attachInputListeners(
  canvas: HTMLCanvasElement,
  dispatch: Dispatch<UIAction>,
  inputsRef: RefObject<InputState>,
) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (!CONST.inputKeys.has(e.code)) return;
    e.preventDefault();
    if (e.code === "ArrowUp") inputsRef.current.up = true;
    if (e.code === "ArrowDown") inputsRef.current.down = true;
    if (e.code === "Space") {
      if (!e.repeat) {
        dispatch({ type: "startStop" });
      }
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.code === "ArrowUp") inputsRef.current.up = false;
    if (e.code === "ArrowDown") inputsRef.current.down = false;
  };

  const onBlur = () => {
    inputsRef.current.up = false;
    inputsRef.current.down = false;
  };

  const updatePointerY = (clientY: number) => {
    const r = canvas.getBoundingClientRect();
    const ratio = (clientY - r.top) / r.height;
    const y = ratio * CONST.virtualCanvasHeight;
    inputsRef.current.pointerY = Math.max(0, Math.min(CONST.virtualCanvasHeight, y));
  };

  const onPointerMove = (e: PointerEvent) => {
    updatePointerY(e.clientY);
  };

  const onPointerDown = (e: PointerEvent) => {
    canvas.setPointerCapture(e.pointerId);
    updatePointerY(e.clientY);
    if (e.pointerType === "mouse") {
      e.preventDefault();
      dispatch({ type: "startStop" });
    }
  };

  const onPointerUpOrCancel = (e: PointerEvent) => {
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
  };

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", onBlur);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUpOrCancel);
  canvas.addEventListener("pointercancel", onPointerUpOrCancel);

  return () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    window.removeEventListener("blur", onBlur);
    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointerup", onPointerUpOrCancel);
    canvas.removeEventListener("pointercancel", onPointerUpOrCancel);
  };
}
