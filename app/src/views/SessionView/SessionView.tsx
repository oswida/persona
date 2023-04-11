import { Option } from "@zag-js/select/dist/select.types";
import {
  FaSolidClipboard,
  FaSolidNetworkWired,
  FaSolidPlug,
  FaSolidPlus,
  FaSolidStop,
  FaSolidTrash,
} from "solid-icons/fa";
import { Show, createMemo, createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";
import { v4 as uuidv4 } from "uuid";
import {
  appSessions,
  appSettings,
  mqttConnectionStatus,
  netConnect,
  netDisconnect,
  netSessionLink,
  personaSessionsKey,
  PlaySession,
  saveToStorage,
  themeVars,
} from "~/common";
import { Button, Flex, Input, Select, Texte } from "~/components";
import { sessionSettingRootStyle, sessionSettingRowStyle } from "./styles.css";
import { CopyToClipboard } from "solid-copy-to-clipboard";
import { ButtonStyle } from "~/components/Button/styles.css";
import toast from "solid-toast";

export const SessionView = () => {
  let refName: HTMLInputElement;
  const [hosted, setHosted] = createSignal<string | null>();
  const [played, setPlayed] = createSignal<string | null>();

  const create = () => {
    if (!refName || refName.value.trim() === "") return;
    const newSettings = { ...appSessions() };
    const newId = uuidv4();
    newSettings.hosted[newId] = {
      id: newId,
      name: refName.value,
      ownerId: appSettings().ident.browserID,
      cards: [] as string[],
      charsheets: [] as string[],
      players: [] as string[],
    } as PlaySession;
    saveToStorage(personaSessionsKey, newSettings);
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
    const newSettings = { ...appSessions() };
    const nh: Record<string, PlaySession> = {};
    Object.keys(newSettings.hosted).forEach((key) => {
      if (key != id) nh[key] = newSettings.hosted[key];
    });
    newSettings.hosted = nh;
    saveToStorage(personaSessionsKey, newSettings);
  };

  const hostedItems = createMemo(() => {
    return Object.values(appSessions().hosted)
      .map((it) => ({
        label: it.name,
        value: it.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  });

  const delPlayed = () => {
    const id = played();
    if (!id || id.trim() == "") return;
    const newSettings = { ...appSessions() };
    const nh: Record<string, PlaySession> = {};
    Object.keys(newSettings.client).forEach((key) => {
      if (key != id) nh[key] = newSettings.client[key];
    });
    newSettings.client = nh;
    saveToStorage(personaSessionsKey, newSettings);
  };

  const clientItems = createMemo(() => {
    return Object.values(appSessions().client)
      .map((it) => ({
        label: it.name,
        value: it.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  });

  const startHosting = () => {
    const id = hosted();
    if (!id || id.trim() === "") return;
    const newSettings = { ...appSessions() };
    newSettings.current = id;
    newSettings.hosting = true;
    saveToStorage(personaSessionsKey, newSettings);
    netConnect();
  };

  const startClient = () => {
    const id = played();
    if (!id || id.trim() === "") return;
    const newSettings = { ...appSessions() };
    newSettings.current = id;
    newSettings.hosting = false;
    saveToStorage(personaSessionsKey, newSettings);
    netConnect();
  };

  const stopSession = () => {
    const newSettings = { ...appSessions() };
    newSettings.current = "";
    newSettings.hosting = false;
    saveToStorage(personaSessionsKey, newSettings);
    netDisconnect();
  };

  return (
    <div class={sessionSettingRootStyle}>
      <Texte size="bigger" >Sessions</Texte>
      <Texte size="small" themeColor="secondary">Hosted</Texte>
      <div class={sessionSettingRowStyle}>
        <Button onClick={delHosted} title="Delete selected session">
          <FaSolidTrash />
        </Button>
        <Dynamic
          component={Select}
          options={hostedItems}
          onChange={onHostedChange}
          label="Session:"
        />
        <Button onClick={startHosting} title="Host selected session">
          <FaSolidNetworkWired />
        </Button>
      </div>
      <div class={sessionSettingRowStyle}>
        <Input ref={(e) => (refName = e)} style={{ width: "12rem" }} />
        <Button onClick={create} title="Create session">
          <FaSolidPlus />
        </Button>
      </div>
      <div style={{ height: "0.5rem", "border-bottom": `1px solid ${themeVars.color.secondary}` }}></div>
      <Texte size="small" themeColor="secondary" >Played</Texte>
      <div class={sessionSettingRowStyle}>
        <Button onClick={delPlayed}>
          <FaSolidTrash />
        </Button>
        <Dynamic
          component={Select}
          options={clientItems}
          onChange={onPlayedChange}
          label="Session"
        />
        <Button onClick={startClient} title="Connect">
          <FaSolidPlug />
        </Button>
      </div>
      <div style={{ height: "0.5rem", "border-bottom": `1px solid` }}></div>
      <div class={sessionSettingRowStyle}>
        <Texte size="small" themeColor="secondary" >Current</Texte>
        <Show when={mqttConnectionStatus()}>
          <FaSolidNetworkWired title="Connected to server" />
        </Show>
      </div>

      <div class={sessionSettingRowStyle}>

        <Show when={appSessions().current != "" && appSessions().hosting}>
          <Texte size="middle">
            Hosting: {appSessions().hosted[appSessions().current].name}
          </Texte>
          <Flex>
            <Button onClick={stopSession} title="Stop hosting" shape="icon">
              <FaSolidStop />
            </Button>
            <CopyToClipboard
              text={netSessionLink()}
              onCopy={() => toast("Session link copied to clipboard")}
              eventTrigger="onClick"
            >
              <div
                title="Copy session link"
                class={ButtonStyle({ shape: "icon" })}
              >
                <FaSolidClipboard />
              </div>
            </CopyToClipboard>
          </Flex>
        </Show>
        <Show
          when={appSessions().current != "" && !appSessions().hosting}
        >
          <Texte size="small">
            Connected to:{" "}
            {appSessions().client[appSessions().current].name}
          </Texte>
          <Button onClick={stopSession} title="Stop Disconnect">
            <FaSolidStop />
          </Button>
        </Show>
      </div>
    </div>
  );
};
