import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { v4 as uuidv4 } from "uuid";

export type RollInfo = {
  id: string;
  user: string;
  time: string;
  comment: string;
  data: string;
  color: string;
};

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
    topic: string;
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
        topic: "",
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
  rolls: DiceRoll[];
  text: string;
  author: string;
  color: string;
  tstamp: string;
};
