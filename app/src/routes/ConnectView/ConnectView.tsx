import { Navigate, useSearchParams } from "@solidjs/router";
import { Component } from "solid-js";
import {
  appSessions,
  appSettings,
  decompressData64,
  netConnect,
  personaSessionsKey,
  personaSettingsKey,
  PlaySession,
  saveToStorage,
} from "~/common";

export const ConnectView: Component = () => {
  const [params] = useSearchParams();

  let data = params.data;
  if (data.trim() !== "") {
    const dt = decompressData64(data);
    const newState = {
      ...appSettings(),
    };
    newState.comms.mqtt.credentials = dt.credentials;
    newState.comms.mqtt.server = dt.server;
    saveToStorage(personaSettingsKey, newState);

    const newSess = { ...appSessions() };
    newSess.current = dt.sessionId;
    newSess.hosting = false;
    newSess.client[dt.sessionId] = {
      id: dt.sessionId,
      name: dt.sessionName,
    } as PlaySession;
    saveToStorage(personaSessionsKey, newSess);

    netConnect();
  }
  return <Navigate href={"/"}></Navigate>;
};
