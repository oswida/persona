import { v4 as uuidv4 } from "uuid";

export type RollInfo = {
  id: string;
  user: string;
  time: string;
  comment: string;
  data: string;
  color: string;
};

export type SessionInfo = {
  username: string;
  browserID: string;
  remote: string;
  hosting: boolean;
  nats: string;
  nats_token: string;
  lang?: string;
  color?: string;
};

export const emptySessionInfo = (generate?: boolean) => {
  return {
    username: "Noname",
    browserID: generate ? uuidv4() : "",
    hosting: false,
    remote: "",
    nats: "",
    nats_token: "",
    lang: "en",
    color: "#fff",
  };
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
