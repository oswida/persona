import { settingsData } from "~/common";
import { Flex, Input, Texte } from "~/components";

export const CommSettings = () => {
  return (
    <Flex dn="column" style={{ gap: "10px" }}>
      <Texte>MQTT server</Texte>
      <Flex
        style={{ padding: "5px", gap: "10px", "margin-top": "5px" }}
        vcenter
      >
        <Texte>Server address</Texte>
        <Input value={settingsData().comms.mqtt.server} />
      </Flex>
    </Flex>
  );
};
