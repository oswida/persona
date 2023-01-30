import { Navigate, useSearchParams } from "@solidjs/router";
import { Component } from "solid-js";
import {
  decompressData64,
  netConnect,
  personaSessionsKey,
  personaSettingsKey,
  PlaySession,
  saveGenericData,
  sessionData,
  setSessionData,
  setSettingsData,
  settingsData,
} from "~/common";

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
    setSettingsData(newState);
    saveGenericData(personaSettingsKey, newState);

    const newSess = { ...sessionData() };
    newSess.current = dt.sessionId;
    newSess.hosting = false;
    newSess.client[dt.sessionId] = {
      id: dt.sessionId,
      name: dt.sessionName,
    } as PlaySession;
    setSessionData(newSess);
    saveGenericData(personaSessionsKey, newSess);

    netConnect();
  }
  return <Navigate href={"/"}></Navigate>;
};
