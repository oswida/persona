import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { v4 as uuidv4 } from "uuid";

export type PlaySession = {
  id: string;
  name: string;
  ownerId: string;
  players: string[];
  charsheets: string[];
  cards: string[];
  backgroundImg: string;
};

export type SessionSettings = {
  hosted: Record<string, PlaySession>;
  client: Record<string, PlaySession>;
  current: string;
  hosting: boolean;
};

export type IdentSettings = {
  username: string;
  browserID: string;
  color?: string;
};

export type CommunicationSettings = {
  type: "mqtt" | "supabase";
  mqtt: {
    server: string;
    credentials: string;
  };
};

export type AppSettings = {
  lang: string;
  theme?: string;
  font?: string;
};

export type Settings = {
  app: AppSettings;
  ident: IdentSettings;
  comms: CommunicationSettings;
};

export const emptySettings = (generate?: boolean) => {
  const x: Settings = {
    app: {
      lang: "en",
    },
    ident: {
      username: "Noname",
      browserID: generate ? uuidv4() : "",
      color: "#fff",
    },
    comms: {
      type: "mqtt",
      mqtt: {
        server: "",
        credentials: "",
      },
    },
  };
  return x;
};

export const emptySessions = () => {
  return {
    hosted: {},
    client: {},
    current: "",
    hosting: false,
  } as SessionSettings;
};

export type WhiteboardState = {
  tool: string;
  brush: string;
  fill: string;
  width: number;
};

export const initialWhiteboardState: WhiteboardState = {
  tool: "select",
  brush: "white",
  fill: "transparent",
  width: 0,
};

export type ChatEntry = {
  etype: "roll" | "text";
  rolls: SerializedRoll[];
  text: string;
  author: string;
  color: string;
  tstamp: string;
};

export type SerializedRoll = {
  output: string;
  total: number;
  minTotal: number;
  maxTotal: number;
  notation: string;
  rolls: string[];
  type: string;
};

// Net
export type NetMessage = {
  sender: string;
  data: any;
};
export type ConnectionInfo = {
  username: string;
  color: string;
  count?: number;
  connected_at?: string;
  last_seen_at?: string;
};

export type RollMessage = {
  id: string;
  user: string;
  time: string;
  comment: string;
  color: string;
  rolls: DiceRoll[];
};

export type CharsheetData = {
  id: string;
  owner: string;
  name: string;
  playerId: string;
  playerName: string;
  templateId: string;
  values: Record<string, any>;
};

export type CardData = {
  id: string;
  owner: string;
  title: string;
  content: string;
  footer: string;
  isPublic: boolean;
};

export type DiceType =
  | "d4"
  | "d6"
  | "d8"
  | "d10"
  | "d12"
  | "d20"
  | "dF"
  | "d100";
