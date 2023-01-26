import { Option } from "@zag-js/select/dist/select.types";
import { FaSolidNetworkWired, FaSolidPlug, FaSolidTrash } from "solid-icons/fa";
import { createMemo, createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";
import { v4 as uuidv4 } from "uuid";
import {
  personaSessionsKey,
  PlaySession,
  saveGenericData,
  saveSettings,
  sessionData,
  setSessionData,
  setSettingsData,
  settingsData,
} from "~/common";
import { mqttConnect } from "~/common/mqtt";
import { Button, Flex, Input, Select, Texte } from "~/components";

export const SessionView = () => {
  let refName: HTMLInputElement;
  const [hosted, setHosted] = createSignal<string | null>();
  const [played, setPlayed] = createSignal<string | null>();

  const create = () => {
    if (!refName || refName.value.trim() === "") return;
    const newSettings = { ...sessionData() };
    const newId = uuidv4();
    newSettings.hosted[newId] = {
      id: newId,
      name: refName.value,
      ownerId: settingsData().ident.browserID,
      cards: {},
      charsheets: {},
      players: {},
    } as PlaySession;
    saveGenericData(personaSessionsKey, newSettings);
    setSessionData(newSettings);
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
    const newSettings = { ...sessionData() };
    const nh: Record<string, PlaySession> = {};
    Object.keys(newSettings.hosted).forEach((key) => {
      if (key != id) nh[key] = newSettings.hosted[key];
    });
    newSettings.hosted = nh;
    saveGenericData(personaSessionsKey, newSettings);
    setSessionData(newSettings);
  };

  const hostedItems = createMemo(() => {
    return Object.values(sessionData().hosted)
      .map((it) => ({
        label: it.name,
        value: it.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  });

  const delPlayed = () => {
    const id = played();
    if (!id || id.trim() == "") return;
    const newSettings = { ...sessionData() };
    const nh: Record<string, PlaySession> = {};
    Object.keys(newSettings.client).forEach((key) => {
      if (key != id) nh[key] = newSettings.client[key];
    });
    newSettings.client = nh;
    saveGenericData(personaSessionsKey, newSettings);
    setSessionData(newSettings);
  };

  const clientItems = createMemo(() => {
    return Object.values(sessionData().client)
      .map((it) => ({
        label: it.name,
        value: it.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  });

  const startHosting = () => {
    const id = hosted();
    if (!id || id.trim() === "") return;
    const newSettings = { ...sessionData() };
    newSettings.current = id;
    newSettings.hosting = true;
    saveGenericData(personaSessionsKey, newSettings);
    setSessionData(newSettings);
    mqttConnect();
  };

  const startClient = () => {
    const id = played();
    if (!id || id.trim() === "") return;
    const newSettings = { ...sessionData() };
    newSettings.current = id;
    newSettings.hosting = false;
    saveGenericData(personaSessionsKey, newSettings);
    setSessionData(newSettings);
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
