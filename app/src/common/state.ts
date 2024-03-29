import { Client } from "paho-mqtt";
import { createMemo, createSignal } from "solid-js";
import { themeList } from "./theme.css";
import {
  CharsheetData,
  CharsheetEditorState,
  ChatEntry,
  ConnectionInfo,
  DrawToolType,
  initialWhiteboardState,
  WhiteboardState,
} from "./types";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { appSessions } from "./storage";
import { Canvas } from "fabric";

// App state
export const [currentTheme, setCurrentTheme] = createSignal<string>("fire");
export const [currentFont, setCurrentFont] =
  createSignal<string>("Merriweather");
export const currentThemeIdx = createMemo(() => {
  for (let i = 0; i < themeList.length; i++) {
    if (themeList[i].value == currentTheme()) return i;
  }
  return 0;
});

export const [storageSize, setStorageSize] = createSignal(0);

// DiceView
export const [selectedDice, setSelectedDice] = createSignal("");

// WhiteboardView
export const [wbState, setWbState] = createSignal<WhiteboardState>(
  initialWhiteboardState
);
export const [drawTool, setDrawTool] = createSignal<DrawToolType>("select");

// Dice Roller
export const [selectedDicePool, setSelectedDicePool] = createSignal<
  Record<string, number>
>({});

// Chat
export const [chatList, setChatList] = createSignal<ChatEntry[]>([]);
export const [chatVisible, setChatVisible] = createSignal(false);

// Net
export const [netConnections, setNetConnections] = createSignal<
  Record<string, ConnectionInfo>
>({});

// Mqtt
export const [mqttConnectionStatus, setMqttConnectionStatus] =
  createSignal(false);
export const [mqttClient, setMqttClient] = createSignal<Client | undefined>(
  undefined
);

// Cards
export const [cardsVisible, setCardsVisible] = createSignal(false);

export const currentSession = createMemo(() => {
  if (appSessions().current.trim() == "") return undefined;
  return appSessions().sessions[appSessions().current];
});

export type rightViewType = "chat" | "settings" | "session" | "dice" | "none";

export const [selectedRightView, setSelectedRightView] =
  createSignal<rightViewType>("none");

export type leftViewType = "cards" | "sheets" | "counters" | "assets" | "draw" | "none";

export const [selectedLeftView, setSelectedLeftView] =
  createSignal<leftViewType>("none");

export const [lastRoll, setLastRoll] = createSignal<DiceRoll[]>([]);

export const [appCanvas, setAppCanvas] = createSignal<Canvas | undefined>(undefined);