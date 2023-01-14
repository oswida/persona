import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createMemo, createSignal } from "solid-js";
import {
  darkThemeClass,
  darkThemeVars,
  lightThemeVars,
  themeVars,
} from "./theme.css";
import {
  emptySettings,
  IdentSettings,
  initialWhiteboardState,
  RollInfo,
  Settings,
  WhiteboardState,
  ChatEntry,
} from "./types";

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
export const [settingsData, setSettingsData] = createSignal<Settings>(
  emptySettings()
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

// Chat
export const [chatList, setChatList] = createSignal<ChatEntry[]>([]);
