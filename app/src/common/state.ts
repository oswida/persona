import {
  darkThemeClass,
  darkThemeVars,
  lightThemeVars,
  themeVars,
} from "./theme.css";
import { createMemo, createSignal } from "solid-js";
import {
  emptySessionInfo,
  initialWhiteboardState,
  RollInfo,
  SessionInfo,
  WhiteboardState,
} from "./types";
import { assignInlineVars } from "@vanilla-extract/dynamic";

// App state
export const [currentTheme, setCurrentTheme] = createSignal<
  typeof darkThemeVars | typeof lightThemeVars
>(darkThemeVars);
export const [currentThemeClass, setCurrentThemeClass] =
  createSignal<string>(darkThemeClass);

export const currentStyle = createMemo(() => {
  return assignInlineVars(themeVars, currentTheme());
});

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

// Dice Roller
export const [selectedDicePool, setSelectedDicePool] = createSignal<
  Record<string, number>
>({});
