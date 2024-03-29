import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { v4 as uuidv4 } from "uuid";

export type PlaySession = {
  id: string;
  name: string;
  ownerId: string;
  players: string[];
  backgroundImg: string;
  tableData: any;
};

export type SessionSettings = {
  sessions: Record<string, PlaySession>;
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
      theme: "darkblue",
      font: "Lato",
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
    sessions: {},
    current: "",
    hosting: false,
  } as SessionSettings;
};

// ----
export type WhiteboardState = {
  freedraw: boolean;
  stroke: string;
  fill: string;
  width: number;
};

export const initialWhiteboardState: WhiteboardState = {
  freedraw: false,
  stroke: "#000000",
  fill: "transparent",
  width: 1,
};
//------

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
  values: { [key: string]: string }[];
  lastUpdate: string;
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

export type CharsheetEditorState = {
  visible: boolean;
  size: "narrow" | "standard" | "wide";
};

export type AssetData = {
  id: string;
  name: string;
  uri: string;
  scale: number;
}

export type StorageItemType =
  Settings |
  SessionSettings |
  Record<string, CardData> |
  string |
  Record<string, AssetData> |
  Record<string, CounterData> |
  Record<string, GameData>;

export type DrawToolType = "text" | "rectangle" | "circle" |
  "ellipse" | "triangle" | "freedraw" | "select" |
  "eraser" | "line" | "note";


export type CounterData = {
  id: string;
  owner: string;
  title: string;
  ctype: "clock" | "resource";
  maxval: number;
}

export type CounterMeta = {
  currentVal: number;
  id: string;
  counterId: string;
  title: string;
  counterRef?: Object;
  titleRef: Object;
}


export type GameData = {
  id: string;
  name: string;
  dict: Record<string, any>;
  template: any;
}