import { createMemo, Show } from "solid-js";
import {
  personaSettingsKey,
  saveGenericData,
  setSettingsData,
  settingsData,
} from "~/common";
import {
  Badge,
  Flex,
  Input,
  SelectItem,
  Texte,
  ToggleButton,
} from "~/components";

export const CommSettings = () => {
  const commItems: SelectItem[] = [{ key: "mqtt", value: "MQTT" }];
  let refServer: HTMLInputElement;
  let refCreds: HTMLInputElement;
  let refPrefix: HTMLInputElement;

  const toggleMqttType = (pressed: boolean) => {
    const newState = { ...settingsData() };
    newState.comms.mqtt.hosting = pressed;
    setSettingsData(newState);
    // saveGenericData(personaSettingsKey, newState);
  };

  const isHost = createMemo(() => {
    return settingsData().comms.mqtt.hosting;
  });

  const update = () => {
    const newState = { ...settingsData() };
    newState.comms.mqtt.server = refServer.value;
    newState.comms.mqtt.credentials = refCreds.value;
    newState.comms.mqtt.prefix = refPrefix.value;
    setSettingsData(newState);
  };

  return (
    <Flex dn="column" style={{ gap: "10px" }}>
      <Texte>MQTT server configuration</Texte>
      <Flex
        style={{ padding: "5px", gap: "10px", "margin-top": "5px" }}
        vcenter
      >
        <Texte>Connection type</Texte>
        <ToggleButton
          onPressedChange={toggleMqttType}
          pressed={<Badge>Host</Badge>}
          released={<Badge>Client</Badge>}
        />
      </Flex>
      <Flex
        style={{ padding: "5px", gap: "10px", "margin-top": "5px" }}
        vcenter
      >
        <Texte>Server address</Texte>
        <Input
          value={settingsData().comms.mqtt.server}
          ref={(e) => (refServer = e)}
          onChange={update}
        />
      </Flex>
      <Flex
        style={{ padding: "5px", gap: "10px", "margin-top": "5px" }}
        vcenter
      >
        <Texte>Server credentials</Texte>
        <Input
          value={settingsData().comms.mqtt.credentials}
          ref={(e) => (refCreds = e)}
          onChange={update}
        />
      </Flex>
      <Flex
        style={{ padding: "5px", gap: "10px", "margin-top": "5px" }}
        vcenter
      >
        <Show when={!isHost()}>
          <Texte>Topic prefix</Texte>
          <Input
            value={settingsData().comms.mqtt.prefix}
            ref={(e) => (refPrefix = e)}
            onChange={update}
          />
        </Show>
      </Flex>
    </Flex>
  );
};
