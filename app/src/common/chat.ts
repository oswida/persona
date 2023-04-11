import { netPublish, topicChat } from "./net";
import { chatList, mqttClient, setChatList } from "./state";
import { ChatEntry } from "./types";
import { prettyNow } from "./util";

export const chatText = (
  author: string,
  color: string,
  msg: string,
  withNetwork: boolean = false
) => {
  const entry = {
    etype: "text",
    text: msg,
    author: author,
    color: color,
    tstamp: prettyNow(),
  } as ChatEntry;
  const newState = [...chatList(), entry];
  setChatList(newState);
  if (withNetwork) {
    const cl = mqttClient();
    if (!cl) return;
    netPublish(topicChat, entry);
  }
};
