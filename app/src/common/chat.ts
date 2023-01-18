import { mqttPublish, mqttTopic, topicChat } from "./mqtt";
import { chatList, mqttClient, setChatList, settingsData } from "./state";
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
    mqttPublish(
      settingsData().ident.browserID,
      cl,
      mqttTopic(topicChat),
      entry
    );
  }
};
