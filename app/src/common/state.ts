import { Client } from "paho-mqtt";
import { createMemo, createSignal } from "solid-js";
import { Tpl } from "~/templates/types";
import { themeList } from "./theme.css";
import {
  CharsheetData,
  CharsheetEditorState,
  ChatEntry,
  ConnectionInfo,
  initialWhiteboardState,
  WhiteboardState,
} from "./types";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { appSessions } from "./storage";

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
export const [cardsVisible, setCardsVisible] = createSignal(false);


export const sessionCards = createMemo(() => {
  if (appSessions().current.trim() == "") return [];
  if (appSessions().hosting) {
    return appSessions().hosted[appSessions().current].cards;
  } else {
    return appSessions().client[appSessions().current].cards;
  }
});

export const currentSession = createMemo(() => {
  if (appSessions().current.trim() == "") return undefined;
  if (appSessions().hosting) {
    return appSessions().hosted[appSessions().current];
  } else {
    return appSessions().client[appSessions().current];
  }
});

//Charsheets
export const [charsheetData, setCharsheetData] = createSignal<
  Record<string, CharsheetData>
>({});
export const [charsheetVisible, setCharsheetVisible] = createSignal(false);
export const [editorState, setEditorState] = createSignal<CharsheetEditorState>(
  {
    size: "standard",
    visible: true,
  }
);

export const sessionCharsheets = createMemo(() => {
  if (appSessions().current.trim() == "") return [];
  if (appSessions().hosting) {
    return appSessions().hosted[appSessions().current].charsheets;
  } else {
    return appSessions().client[appSessions().current].charsheets;
  }
});

export type rightViewType = "chat" | "settings" | "session" | "dice" | "none";

export const [selectedRightView, setSelectedRightView] =
  createSignal<rightViewType>("none");

export type leftViewType = "cards" | "sheets" | "clocks" | "assets" | "none";

export const [selectedLeftView, setSelectedLeftView] =
  createSignal<leftViewType>("none");

export const [lastRoll, setLastRoll] = createSignal<DiceRoll[]>([]);