import { Client, Message } from "paho-mqtt";
import {
  CardData,
  cardsData,
  charsheetData,
  setCardsData,
  setCharsheetData,
} from "~/common";
import { chatText } from "./chat";
import {
  topicCardDelete,
  topicCardUpdate,
  topicCSDelete,
  topicCSUpdate,
} from "./net";
import {
  personaCardsKey,
  personaCharsheetKey,
  personaSessionsKey,
  saveGenericData,
} from "./storage";

import {
  chatList,
  mqttClient,
  netConnections,
  sessionData,
  setChatList,
  setMqttClient,
  setMqttConnectionStatus,
  setNetConnections,
  setSessionData,
  settingsData,
  topicChat,
  topicConnect,
  topicSessionInfo,
} from ".";
import {
  CharsheetData,
  ChatEntry,
  ConnectionInfo,
  NetMessage,
  PlaySession,
} from "./types";
import { compressData64, decompressData64, prettyNow } from "./util";

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
  let prefix = sessionData().current;
  return `${prefix}/${name}`;
};

export const mqttPublish = (
  client: Client,
  sender: string,
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
          color: info.color,
        };
      }
      setNetConnections(nst);
      chatText(info.username, info.color, `Connected to session.`);
      const cl = mqttClient();
      if (sessionData().hosting && cl) {
        const si = sessionData().hosted[sessionData().current];
        mqttPublish(
          cl,
          settingsData().ident.browserID,
          mqttTopic(topicSessionInfo),
          si
        );
      }
      //notify(apd, `User ${info.username} connected`, 5000);
      break;
    case mqttTopic(topicChat):
      const data = m.data as ChatEntry;
      const newState = [...chatList(), data];
      setChatList(newState);
      // saveGenericData(inodRollsKey, newState);
      break;
    case mqttTopic(topicSessionInfo):
      const sess = m.data as PlaySession;
      if (!sessionData().hosting) {
        const newState = { ...sessionData() };
        newState.client[sess.id] = sess;
        setSessionData(newState);
        saveGenericData(personaSessionsKey, newState);
      }
      break;
    case mqttTopic(topicCardUpdate):
      const cards = m.data as CardData[];
      const newCards = { ...cardsData() };
      cards.forEach((it) => {
        newCards[it.id] = it;
      });
      setCardsData(newCards);
      saveGenericData(personaCardsKey, newCards);
      break;
    case mqttTopic(topicCardDelete):
      const cards2 = m.data as string[];
      const ns: Record<string, CardData> = {};
      Object.values(cardsData()).forEach((c) => {
        const fnd = cards2.includes(c.id);
        if (!fnd || c.owner == settingsData().ident.browserID) ns[c.id] = c;
      });
      setCardsData(ns);
      saveGenericData(personaCardsKey, ns);
      break;
    case mqttTopic(topicCSUpdate):
      const sheets = m.data as CharsheetData[];
      const newSheets = { ...charsheetData() };
      sheets.forEach((it) => {
        newSheets[it.id] = it;
      });
      setCharsheetData(newSheets);
      saveGenericData(personaCharsheetKey, newSheets);
      break;
    case mqttTopic(topicCSDelete):
      const sheets2 = m.data as string[];
      const nsh: Record<string, CharsheetData> = {};
      Object.values(charsheetData()).forEach((c) => {
        const fnd = sheets2.includes(c.id);
        if (!fnd || c.owner == settingsData().ident.browserID) nsh[c.id] = c;
      });
      setCharsheetData(nsh);
      saveGenericData(personaCharsheetKey, nsh);
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
  const cl = mqttClient();
  if (cl) cl.disconnect();
  setMqttClient(undefined);

  try {
    const client = new Client(env.server, ident.browserID);
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
            // register connection
            mqttPublish(
              client,
              settingsData().ident.browserID,
              mqttTopic(topicConnect),
              {
                username: settingsData().ident.username,
                color: settingsData().ident.color,
              } as ConnectionInfo
            );
            setMqttConnectionStatus(true);
            if (sessionData().hosting) {
              const si = sessionData().hosted[sessionData().current];
              mqttPublish(
                client,
                settingsData().ident.browserID,
                mqttTopic(topicSessionInfo),
                si
              );
            }
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
  } catch (e: any) {
    console.error(e);
  }
};

export const mqttClientLink = () => {
  const sess = sessionData();
  if (!sess.current || sess.current.trim() == "" || !sess.hosting) return "";
  const obj = {
    server: settingsData().comms.mqtt.server,
    credentials: settingsData().comms.mqtt.credentials,
    sessionId: sess.current,
    sessionName: sessionData().hosted[sess.current].name,
  };
  return `${window.location}connect?data=${encodeURIComponent(
    compressData64(obj)
  )}`;
};
