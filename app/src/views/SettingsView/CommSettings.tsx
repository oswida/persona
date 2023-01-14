import { settingsData } from "~/common";
import { Button, Flex, Input, Select, SelectItem, Texte } from "~/components";

export const CommSettings = () => {
  const commItems: SelectItem[] = [{ key: "mqtt", value: "MQTT" }];
  return (
    <Flex dn="column" style={{ gap: "10px" }}>
      <div>
        <Select items={commItems}></Select>
      </div>
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
