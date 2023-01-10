import {
  darkThemeClass,
  darkThemeVars,
  lightThemeClass,
  lightThemeVars,
} from "./theme.css";
import { createSignal } from "solid-js";
import {
  emptySessionInfo,
  initialWhiteboardState,
  RollInfo,
  SessionInfo,
  WhiteboardState,
} from "./types";

// App state
export const [currentTheme, setCurrentTheme] = createSignal<
  typeof darkThemeVars | typeof lightThemeVars
>(darkThemeVars);
export const [currentThemeClass, setCurrentThemeClass] =
  createSignal<string>(darkThemeClass);

// Main session data
export const [sessionData, setSessionData] = createSignal<SessionInfo>(
  emptySessionInfo()
);
export const [storageSize, setStorageSize] = createSignal(0);

// DiceView
export const [selectedDice, setSelectedDice] = createSignal("");
export const [rollHistory, setRollHistory] = createSignal<RollInfo[]>([]);

// WhiteboardView
export const [wbState, setWbState] = createSignal<WhiteboardState>(
  initialWhiteboardState
);
