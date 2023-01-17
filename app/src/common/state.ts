import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Client } from "paho-mqtt";
import { createMemo, createSignal } from "solid-js";
import { Tpl } from "~/templates/types";
import {
  darkThemeClass,
  darkThemeVars,
  lightThemeVars,
  themeVars,
} from "./theme.css";
import {
  ChatEntry,
  ConnectionInfo,
  emptySettings,
  initialWhiteboardState,
  PlaySession,
  Settings,
  WhiteboardState,
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

// Main settings data
export const [settingsData, setSettingsData] = createSignal<Settings>(
  emptySettings()
);
export const [storageSize, setStorageSize] = createSignal(0);

// DiceView
export const [selectedDice, setSelectedDice] = createSignal("");

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

// Templates
export const [csTemplateList, setCsTemplateList] = createSignal<
  Record<string, Tpl>
>({});

// Play session
export const [playSession, setPlaySession] = createSignal<PlaySession>();
export const [playSessionList, setPlaySessionList] = createSignal<
  PlaySession[]
>([]);
