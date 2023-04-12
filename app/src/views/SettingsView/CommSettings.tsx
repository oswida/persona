import { createMemo, createSignal, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Flex, Input, Select, SelectOption, Texte } from "~/components";
import { settingFieldStyle, SettingFieldStyle } from "./styles.css";
import { appSettings, mqttConnectionStatus, personaSettingsKey, saveToStorage } from "~/common";
import { FaSolidNetworkWired } from "solid-icons/fa";

export const CommSettings = () => {
  let refServer: HTMLInputElement;
  let refCreds: HTMLInputElement;
  const [ts, setTs] = createSignal<string>(appSettings().comms.type);

  const update = () => {
    const newState = { ...appSettings() };
    switch (ts()) {
      case "mqtt":
        newState.comms.mqtt.server = refServer.value;
        newState.comms.mqtt.credentials = refCreds.value;
        break;
      case "supabase":
        break;
    }
    saveToStorage(personaSettingsKey, newState);
  };

  const typeOptions = createMemo(() => {
    return [
      { label: "MQTT", value: "mqtt" } as SelectOption,
      { label: "Supabase", value: "supabase" } as SelectOption,
    ];
  });

  const selectedItem = createMemo(() => {
    const opt = typeOptions();
    for (let i = 0; i < opt.length; i++) {
      if (opt[i].value == appSettings().comms.type) {
        return i;
      }
    }
    return -1;
  });

  const typeSelect = (details: SelectOption | null) => {
    setTs(details ? details.value : "");
  };

  return (
    <Flex dn="column" style={{ gap: "10px" }} >
      <Show when={mqttConnectionStatus()}>
        <Flex>
          <FaSolidNetworkWired title="Connected to server" /> Connected
        </Flex>
      </Show>
      <div class={settingFieldStyle}>
        <Texte size="small" themeColor="secondary">Server type</Texte>
        <Dynamic
          component={Select}
          label=""
          options={typeOptions}
          selected={selectedItem}
          onChange={typeSelect}
        />

      </div>

      <Show when={ts() == "mqtt"}>
        <Texte size="small" themeColor="secondary">MQTT server configuration</Texte>

        <div class={settingFieldStyle}>
          <Texte size="small" themeColor="secondary">Server address</Texte>
          <Input
            style={{ flex: 1 }}
            value={appSettings().comms.mqtt.server}
            ref={(e) => (refServer = e)}
            onChange={update}
          />

        </div>
        <div class={settingFieldStyle}>
          <Texte size="small" themeColor="secondary">Server credentials</Texte>
          <Input
            style={{ flex: 1 }}
            value={appSettings().comms.mqtt.credentials}
            ref={(e) => (refCreds = e)}
            onChange={update}
          />
        </div>

      </Show>
    </Flex>
  );
};
