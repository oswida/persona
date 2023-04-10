import { createMemo, createSignal, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { setSettingsData, settingsData } from "~/common";
import { Flex, Input, Select, SelectOption, Texte } from "~/components";
import { settingFieldStyle, SettingFieldStyle } from "./styles.css";

export const CommSettings = () => {
  let refServer: HTMLInputElement;
  let refCreds: HTMLInputElement;
  const [ts, setTs] = createSignal<string>(settingsData().comms.type);

  const update = () => {
    const newState = { ...settingsData() };
    switch (ts()) {
      case "mqtt":
        newState.comms.mqtt.server = refServer.value;
        newState.comms.mqtt.credentials = refCreds.value;
        break;
      case "supabase":
        break;
    }
    setSettingsData(newState);
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
      if (opt[i].value == settingsData().comms.type) {
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
            value={settingsData().comms.mqtt.server}
            ref={(e) => (refServer = e)}
            onChange={update}
          />
        </div>
        <div class={settingFieldStyle}>
          <Texte size="small" themeColor="secondary">Server credentials</Texte>
          <Input
            style={{ flex: 1 }}
            value={settingsData().comms.mqtt.credentials}
            ref={(e) => (refCreds = e)}
            onChange={update}
          />
        </div>
      </Show>
    </Flex>
  );
};
