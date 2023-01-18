import { FaSolidNetworkWired, FaSolidPlug, FaSolidTrash } from "solid-icons/fa";
import { createMemo, createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";
import { v4 as uuidv4 } from "uuid";
import {
  PlaySession,
  saveSettings,
  setSettingsData,
  settingsData,
} from "~/common";
import { Button, Flex, Input, Select, Texte } from "~/components";
import { Option } from "@zag-js/select/dist/select.types";
import { mqttConnect } from "~/common/mqtt";

export const SessionView = () => {
  let refName: HTMLInputElement;
  const [hosted, setHosted] = createSignal<string | null>();
  const [played, setPlayed] = createSignal<string | null>();

  const create = () => {
    if (!refName || refName.value.trim() === "") return;
    const newSettings = { ...settingsData() };
    const newId = uuidv4();
    newSettings.app.sessions.hosted[newId] = {
      id: newId,
      name: refName.value,
      ownerId: settingsData().ident.browserID,
      cards: {},
      charsheets: {},
      players: {},
    } as PlaySession;
    saveSettings(newSettings);
    setSettingsData(newSettings);
    refName.value = "";
  };

  const onHostedChange = (opt: Option | null) => {
    if (opt == null) {
      setHosted(null);
      return;
    }
    setHosted(opt.value);
  };

  const onPlayedChange = (opt: Option | null) => {
    if (opt == null) {
      setPlayed(null);
      return;
    }
    setPlayed(opt.value);
  };

  const delHosted = () => {
    const id = hosted();
    if (!id || id.trim() == "") return;
    const newSettings = { ...settingsData() };
    const nh: Record<string, PlaySession> = {};
    Object.keys(newSettings.app.sessions.hosted).forEach((key) => {
      if (key != id) nh[key] = newSettings.app.sessions.hosted[key];
    });
    newSettings.app.sessions.hosted = nh;
    saveSettings(newSettings);
    setSettingsData(newSettings);
  };

  const hostedItems = createMemo(() => {
    return Object.values(settingsData().app.sessions.hosted)
      .map((it) => ({
        label: it.name,
        value: it.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  });

  const delPlayed = () => {
    const id = played();
    if (!id || id.trim() == "") return;
    const newSettings = { ...settingsData() };
    const nh: Record<string, PlaySession> = {};
    Object.keys(newSettings.app.sessions.client).forEach((key) => {
      if (key != id) nh[key] = newSettings.app.sessions.client[key];
    });
    newSettings.app.sessions.client = nh;
    saveSettings(newSettings);
    setSettingsData(newSettings);
  };

  const clientItems = createMemo(() => {
    return Object.values(settingsData().app.sessions.client)
      .map((it) => ({
        label: it.name,
        value: it.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  });

  const startHosting = () => {
    const id = hosted();
    if (!id || id.trim() === "") return;
    const newSettings = { ...settingsData() };
    newSettings.app.sessions.current = id;
    newSettings.app.sessions.hosting = true;
    saveSettings(newSettings);
    setSettingsData(newSettings);
    mqttConnect();
  };

  const startClient = () => {
    const id = played();
    if (!id || id.trim() === "") return;
    const newSettings = { ...settingsData() };
    newSettings.app.sessions.current = id;
    newSettings.app.sessions.hosting = false;
    saveSettings(newSettings);
    setSettingsData(newSettings);
    mqttConnect();
  };

  return (
    <Flex dn="column">
      <Texte size="small">Hosted</Texte>
      <Flex style={{ flex: 1, "justify-content": "space-between" }}>
        <Button onClick={delHosted}>
          <FaSolidTrash />
        </Button>
        <Dynamic
          component={Select}
          options={hostedItems}
          onChange={onHostedChange}
        />
        <Button onClick={startHosting}>
          <FaSolidNetworkWired />
          <Texte style={{ "margin-left": "5px" }}>Host</Texte>
        </Button>
      </Flex>
      <Flex>
        <Input ref={(e) => (refName = e)} style={{ width: "12rem" }} />
        <Button onClick={create}>Create</Button>
      </Flex>
      <div style={{ height: "0.5rem", "border-bottom": `1px solid` }}></div>
      <Texte size="small">Played</Texte>
      <Flex style={{ flex: 1, "justify-content": "space-between" }}>
        <Button onClick={delPlayed}>
          <FaSolidTrash />
        </Button>
        <Dynamic
          component={Select}
          options={clientItems}
          onChange={onPlayedChange}
        />
        <Button onClick={startClient}>
          <FaSolidPlug />
          <Texte style={{ "margin-left": "5px" }}>Connect</Texte>
        </Button>
      </Flex>
    </Flex>
  );
};
