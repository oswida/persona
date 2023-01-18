import { Navigate, useSearchParams } from "@solidjs/router";
import { Component } from "solid-js";
import {
  decompressData64,
  personaSettingsKey,
  PlaySession,
  saveGenericData,
  setSettingsData,
  settingsData,
} from "~/common";
import { mqttConnect } from "~/common/mqtt";

export const ConnectView: Component = () => {
  const [params] = useSearchParams();

  let data = params.data;
  if (data.trim() !== "") {
    const dt = decompressData64(data);
    const newState = {
      ...settingsData(),
    };
    newState.comms.mqtt.credentials = dt.credentials;
    newState.comms.mqtt.server = dt.server;
    newState.app.sessions.current = dt.sessionId;
    newState.app.sessions.hosting = false;
    newState.app.sessions.client[dt.sessionId] = {
      id: dt.sessionId,
      name: dt.sessionName,
    } as PlaySession;
    setSettingsData(newState);
    saveGenericData(personaSettingsKey, newState);
    mqttConnect();
  }
  return <Navigate href={"/"}></Navigate>;
};
