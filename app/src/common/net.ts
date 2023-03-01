import { mqttClientLink, mqttDisconnect, mqttPublish, mqttTopic } from "./mqtt";
import { mqttConnect } from "~/common/mqtt";
import { mqttClient, settingsData } from "~/common";

export const topicConnect = "TopicConnect";
export const topicChat = "TopicChat";
export const topicSessionInfo = "TopicSessionInfo";
export const topicCardUpdate = "TopicCardUpdate";
export const topicCardDelete = "TopicCardDelete";
export const topicCSUpdate = "TopicCSUpdate";
export const topicCSDelete = "TopicCSDelete";

export const netConnect = () => {
  switch (settingsData().comms.type) {
    case "mqtt":
      mqttConnect();
      break;
    default:
      console.log("unsupported net type");
      break;
  }
};

export const netDisconnect = () => {
  switch (settingsData().comms.type) {
    case "mqtt":
      mqttDisconnect();
      break;
    default:
      console.log("unsupported net type");
      break;
  }
};

export const netSessionLink = () => {
  switch (settingsData().comms.type) {
    case "mqtt":
      return mqttClientLink();
    default:
      console.log("unsupported net type");
      return "";
  }
};

export const netPublish = (topic: string, payload: any) => {
  switch (settingsData().comms.type) {
    case "mqtt":
      const cl = mqttClient();
      if (!cl) return;
      return mqttPublish(
        cl,
        settingsData().ident.browserID,
        mqttTopic(topic),
        payload
      );
    default:
      console.log("unsupported net type");
      return "";
  }
};
