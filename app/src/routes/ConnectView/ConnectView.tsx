import { Navigate, useSearchParams } from "@solidjs/router";
import { Component } from "solid-js";
import {
  decompressData64,
  personaSettingsKey,
  saveGenericData,
  setSettingsData,
  settingsData,
} from "~/common";

export const ConnectView: Component = () => {
  const [params] = useSearchParams();

  let data = params.data;
  if (data.trim() !== "") {
    const dt = decompressData64(data);
    console.log("Connecting", dt);

    const newState = {
      ...settingsData(),
    };
    newState.comms.mqtt.credentials = dt.credentials;
    newState.comms.mqtt.server = dt.server;
    newState.comms.mqtt.prefix = dt.prefix;
    setSettingsData(newState);
    saveGenericData(personaSettingsKey, newState);
  }
  return <Navigate href={"/"}></Navigate>;
};
