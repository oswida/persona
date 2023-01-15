import { FaSolidFloppyDisk } from "solid-icons/fa";
import { Setter } from "solid-js";
import { personaSettingsKey, saveGenericData, settingsData } from "~/common";
import { Button, Flex, Tabs, TabsDesc, Texte } from "~/components";
import { AppSettings } from "./AppSettings";
import { CommSettings } from "./CommSettings";
import { IdentSettings } from "./IdentSettings";

export const SettingsView = ({ setOpen }: { setOpen: Setter<boolean> }) => {
  const tabs: TabsDesc[] = [
    {
      label: "Ident",
      key: "ident",
      value: <IdentSettings />,
    },
    {
      label: "App",
      key: "app",
      value: <AppSettings />,
    },
    {
      label: "Comms",
      key: "comms",
      value: <CommSettings />,
    },
  ];

  const save = () => {
    setOpen(false);
    const newState = { ...settingsData() };
    const mqttEnv = newState.comms.mqtt;
    if (mqttEnv.server.trim() !== "" && mqttEnv.hosting) {
      newState.comms.mqtt.prefix = newState.ident.browserID;
    }
    saveGenericData(personaSettingsKey, settingsData());
  };

  return (
    <Flex
      style={{ "min-width": "400px", "min-height": "200px", gap: "10px" }}
      dn="column"
    >
      <Tabs items={tabs}></Tabs>
      <Flex center>
        <Button onClick={save}>
          <FaSolidFloppyDisk style={{ "margin-right": "10px" }} />
          <Texte>Save</Texte>
        </Button>
      </Flex>
    </Flex>
  );
};
