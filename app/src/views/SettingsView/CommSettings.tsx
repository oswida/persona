import { Option } from "@zag-js/select/dist/select.types";
import { createMemo, createSignal, Show } from "solid-js";
import { setSettingsData, settingsData } from "~/common";
import { Flex, Input, Select, Texte } from "~/components";
import { SettingFieldStyle } from "./styles.css";

export const CommSettings = () => {
  let refServer: HTMLInputElement;
  let refCreds: HTMLInputElement;
  const [ts, setTs] = createSignal("");

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
      { label: "MQTT", value: "mqtt" } as Option,
      { label: "Supabase", value: "supabase" } as Option,
    ];
  });

  const selectedItem = () => {
    const opt = typeOptions();
    for (let i = 0; i < opt.length; i++) {
      if (opt[i].value == settingsData().comms.type) {
        console.log(i);

        return i;
      }
    }
    return -1;
  };

  const typeSelect = (details: Option | null) => {
    setTs(details ? details.value : "");
  };

  return (
    <Flex dn="column" style={{ gap: "10px" }} center>
      <Select
        label="Server type"
        options={typeOptions}
        selected={selectedItem()}
        onChange={typeSelect}
      />

      <Show when={ts() == "mqtt"}>
        <Texte>MQTT server configuration</Texte>

        <div class={SettingFieldStyle}>
          <Texte>Server address</Texte>
          <Input
            style={{ flex: 1 }}
            value={settingsData().comms.mqtt.server}
            ref={(e) => (refServer = e)}
            onChange={update}
          />
        </div>
        <div class={SettingFieldStyle}>
          <Texte>Server credentials</Texte>
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
