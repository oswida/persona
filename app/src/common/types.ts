import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { RollResults } from "@dice-roller/rpg-dice-roller/types/results";
import { v4 as uuidv4 } from "uuid";

export type IdentSettings = {
  username: string;
  browserID: string;
  color?: string;
};

export type CommunicationSettings = {
  type: "mqtt" | "nats";
  mqtt: {
    server: string;
    credentials: string;
    prefix: string;
    hosting: boolean;
  };
};

export type AppSettings = {
  lang: string;
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
        prefix: "",
        hosting: false,
      },
    },
  };
  return x;
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
