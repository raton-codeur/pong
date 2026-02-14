import { UIState, UIAction } from "./define";

export default function reducer(uiState: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "reset":
      return { ...uiState, menu: "start", prevMenu: null, leftScore: 0, rightScore: 0 };

    case "toggleOptions":
      if (uiState.menu === "options")
        return { ...uiState, menu: uiState.prevMenu ?? "start", prevMenu: null };
      return { ...uiState, menu: "options", prevMenu: uiState.menu };
  }

  switch (uiState.menu) {
    case "start":
      if (action.type === "startStop") return { ...uiState, menu: "waitingServe" };
      break;

    case "waitingServe":
      if (
        (action.type === "startStop" && uiState.settings.autoServe === false) ||
        (action.type === "startStop" && action.autoServe)
      )
        return { ...uiState, menu: "playing" };
      break;

    case "playing":
      if (action.type === "startStop") return { ...uiState, menu: "pause" };
      else if (action.type === "rightPlayerScores") {
        if (uiState.rightScore + 1 >= uiState.settings.winningScore)
          return { ...uiState, menu: "gameOver", rightScore: uiState.rightScore + 1 };
        return { ...uiState, menu: "waitingServe", rightScore: uiState.rightScore + 1 };
      } else if (action.type === "leftPlayerScores") {
        if (uiState.leftScore + 1 >= uiState.settings.winningScore)
          return { ...uiState, menu: "gameOver", leftScore: uiState.leftScore + 1 };
        return { ...uiState, menu: "waitingServe", leftScore: uiState.leftScore + 1 };
      }
      break;

    case "pause":
      if (action.type === "startStop") return { ...uiState, menu: "playing" };
      break;

    case "options":
      if (action.type === "startStop")
        return { ...uiState, menu: uiState.prevMenu ?? "start", prevMenu: null };

      switch (action.type) {
        case "setLeftPaddleSpeed":
          return {
            ...uiState,
            settings: { ...uiState.settings, leftPaddleSpeed: action.leftPaddleSpeed },
          };

        case "setRightPaddleSpeed":
          return {
            ...uiState,
            settings: { ...uiState.settings, rightPaddleSpeed: action.rightPaddleSpeed },
          };

        case "setBallSpeed":
          return { ...uiState, settings: { ...uiState.settings, ballSpeed: action.ballSpeed } };

        case "setAutoServe":
          return { ...uiState, settings: { ...uiState.settings, autoServe: action.autoServe } };

        case "setAutoServeDelay":
          return {
            ...uiState,
            settings: { ...uiState.settings, autoServeDelay: action.autoServeDelay },
          };

        case "setMouse":
          return { ...uiState, settings: { ...uiState.settings, mouse: action.mouse } };

        case "setTrail":
          return { ...uiState, settings: { ...uiState.settings, trail: action.trail } };

        case "setWinningScore":
          if (action.winningScore <= uiState.leftScore || action.winningScore <= uiState.rightScore)
            return uiState;
          return {
            ...uiState,
            settings: { ...uiState.settings, winningScore: action.winningScore },
          };
      }

    case "gameOver":
      if (action.type === "startStop")
        return {
          ...uiState,
          menu: "waitingServe",
          prevMenu: "gameOver",
          leftScore: 0,
          rightScore: 0,
        };
  }

  return uiState;
}
