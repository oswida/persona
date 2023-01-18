import { Client, Message } from "paho-mqtt";
import { chatList, mqttClient, setChatList, settingsData } from "~/common";
import {
  netConnections,
  setMqttClient,
  setMqttConnectionStatus,
  setNetConnections,
} from ".";
import { ChatEntry, ConnectionInfo, NetMessage } from "./types";
import { compressData64, decompressData64, prettyNow } from "./util";

export const topicConnect = "TopicConnect";
export const topicChat = "TopicChat";
export const topicBoard = "TopicBoard";
export const topicChars = "TopicChars";
export const topicDraw = "TopicDraw";

export const mqttPack = (sender: string, payload: any) => {
  const msg: NetMessage = {
    sender: sender,
    data: payload,
  };
  return compressData64(msg);
};

export const mqttUnpack = (payload: any) => {
  const d = decompressData64(payload);
  return d as NetMessage;
};

export const mqttTopic = (name: string) => {
  let prefix = settingsData().app.sessions.current;
  return `${prefix}/${name}`;
};

export const mqttPublish = (
  sender: string,
  client: Client,
  topic: string,
  payload: any
) => {
  const msg = new Message(mqttPack(sender, payload));
  msg.destinationName = topic;
  client.send(msg);
};

export const mqttProcess = (msg: Message) => {
  const m = mqttUnpack(msg.payloadString);
  const ident = settingsData().ident;
  const mqttEnv = settingsData().comms.mqtt;

  if (m.sender == ident.browserID) return; // own message
  switch (msg.destinationName) {
    case mqttTopic(topicConnect):
      const info = m.data as ConnectionInfo;
      const nst = { ...netConnections() };
      if (!nst[m.sender]) {
        nst[m.sender] = {
          username: info.username,
          count: 1,
          connected_at: prettyNow(),
          last_seen_at: prettyNow(),
        };
      }
      setNetConnections(nst);
      //notify(apd, `User ${info.username} connected`, 5000);
      break;
    case mqttTopic(topicChat):
      const data = m.data as ChatEntry;
      const newState = [...chatList(), data];
      setChatList(newState);
      // saveGenericData(inodRollsKey, newState);
      break;
    default:
      console.log("Message for unknown topic", m.sender, m.data);
  }
  const nst = { ...netConnections() };
  const usr = nst[m.sender];
  if (usr) {
    usr.last_seen_at = prettyNow();
    usr.count = usr.count ? usr.count + 1 : 1;
    setNetConnections(nst);
  }
};

export const mqttDisconnect = () => {
  const cl = mqttClient();
  if (!cl) return;
  cl.disconnect();
  setMqttClient(undefined);
};

export const mqttConnect = () => {
  const ident = settingsData().ident;
  const env = settingsData().comms.mqtt;
  if (env.server == "") {
    console.error("Server not defined");
    return;
  }
  const client = new Client(env.server, ident.browserID);
  if (client.isConnected()) {
    client.disconnect();
  }
  let un = undefined;
  let pw = undefined;
  const creds = env.credentials;
  if (creds) {
    const parts = creds.split(":");
    un = parts[0];
    pw = parts[1];
  }
  client.connect({
    userName: un,
    password: pw,
    onFailure: (e) => {
      console.error(e.errorMessage);
    },
    onSuccess: (e) => {
      console.log("Connected to MQTT server", e);
      client.subscribe(mqttTopic("+"), {
        onFailure: (e) => {
          console.log(`subscription to ${mqttTopic("+")} failed`, e);
        },
        onSuccess: () => {
          setMqttClient(client);
          mqttPublish(
            settingsData().ident.browserID,
            client,
            mqttTopic(topicConnect),
            {
              username: settingsData().ident.username,
            } as ConnectionInfo
          );
          setMqttConnectionStatus(true);
        },
      });
    },
  });

  client.onMessageArrived = (msg) => {
    mqttProcess(msg);
  };

  client.onConnectionLost = (msg) => {
    console.log("Connection lost", msg);
    setMqttConnectionStatus(false);
  };
};

export const mqttClientLink = () => {
  //TODO:
  // if (!settingsData().comms.mqtt.hosting) return "";
  // const obj = {
  //   server: settingsData().comms.mqtt.server,
  //   credentials: settingsData().comms.mqtt.credentials,
  //   prefix: settingsData().ident.browserID,
  // };
  // return `${window.location}connect?data=${encodeURIComponent(
  //   compressData64(obj)
  // )}`;
};
