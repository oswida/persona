import { createSignal } from "solid-js";
import {
  emptySessionInfo,
  initialWhiteboardState,
  RollInfo,
  SessionInfo,
  WhiteboardState,
} from "./types";

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
