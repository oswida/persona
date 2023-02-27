import { assignInlineVars } from "@vanilla-extract/dynamic";
import { resolveTxt } from "node:dns";
import { Client } from "paho-mqtt";
import { createMemo, createSignal } from "solid-js";
import { Tpl } from "~/templates/types";
import { darksandThemeClass, themeList, themeVars } from "./theme.css";
import {
  CardData,
  CharsheetData,
  ChatEntry,
  ConnectionInfo,
  emptySessions,
  emptySettings,
  initialWhiteboardState,
  PlaySession,
  SessionSettings,
  Settings,
  WhiteboardState,
} from "./types";

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

// Templates
export const [csTemplateList, setCsTemplateList] = createSignal<
  Record<string, Tpl>
>({});

// Cards
export const [cardsData, setCardsData] = createSignal<Record<string, CardData>>(
  {}
);
export const [cardsVisible, setCardsVisible] = createSignal(false);

// Sessions
export const [sessionData, setSessionData] = createSignal<SessionSettings>(
  emptySessions()
);

export const sessionCards = createMemo(() => {
  if (sessionData().current.trim() == "") return [];
  if (sessionData().hosting) {
    return sessionData().hosted[sessionData().current].cards;
  } else {
    return sessionData().client[sessionData().current].cards;
  }
});

export const currentSession = createMemo(() => {
  if (sessionData().current.trim() == "") return undefined;
  if (sessionData().hosting) {
    return sessionData().hosted[sessionData().current];
  } else {
    return sessionData().client[sessionData().current];
  }
});

//Charsheets
export const [charsheetData, setCharsheetData] = createSignal<
  Record<string, CharsheetData>
>({});
export const [charsheetVisible, setCharsheetVisible] = createSignal(false);
