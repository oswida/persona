import { FaSolidFloppyDisk } from "solid-icons/fa";
import { Accessor } from "solid-js";
import toast from "solid-toast";
import { personaSettingsKey, saveGenericData, settingsData } from "~/common";
import { Button, Flex, TabDesc, Tabs, Texte } from "~/components";
import { AppSettings } from "./AppSettings";
import { CommSettings } from "./CommSettings";
import { IdentSettings } from "./IdentSettings";

export const SettingsView = ({ api }: { api: Accessor<any> }) => {
  const tabs: TabDesc[] = [
    {
      label: "Ident",
      value: "ident",
      content: <IdentSettings />,
    },
    {
      label: "App",
      value: "app",
      content: <AppSettings />,
    },
    {
      label: "Comms",
      value: "comms",
      content: <CommSettings />,
    },
  ];

  const save = () => {
    api().close();
    const newState = { ...settingsData() };
    saveGenericData(personaSettingsKey, settingsData());
    toast("Settings saved");
  };

  return (
    <Flex
      style={{ "min-width": "400px", "min-height": "200px", gap: "10px" }}
      dn="column"
    >
      <Tabs items={tabs} value={tabs[0].value}></Tabs>
      <Flex center>
        <Button onClick={save}>
          <FaSolidFloppyDisk style={{ "margin-right": "10px" }} />
          <Texte>Save</Texte>
        </Button>
      </Flex>
    </Flex>
  );
};
