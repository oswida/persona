import { setSettingsData, settingsData } from "~/common";
import { Flex, Input, Texte } from "~/components";

export const CommSettings = () => {
  let refServer: HTMLInputElement;
  let refCreds: HTMLInputElement;

  const update = () => {
    const newState = { ...settingsData() };
    newState.comms.mqtt.server = refServer.value;
    newState.comms.mqtt.credentials = refCreds.value;
    setSettingsData(newState);
  };

  return (
    <Flex dn="column" style={{ gap: "10px" }}>
      <Texte>MQTT server configuration</Texte>

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
    </Flex>
  );
};
