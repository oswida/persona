import { FaSolidFloppyDisk } from "solid-icons/fa";
import { Accessor } from "solid-js";
import toast from "solid-toast";
import {
  appSettings,
  currentSession,
  personaSettingsKey,
  saveToStorage,
} from "~/common";
import { Button, Flex, TabDesc, Tabs, Texte } from "~/components";
import { AppSettings } from "./AppSettings";
import { CurrentSessionSettings } from "./CurrSessionSettings";
import { CommSettings } from "./CommSettings";
import { IdentSettings } from "./IdentSettings";
import { settingRootStyle } from "./styles.css";

export const SettingsView = () => {
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

  if (currentSession()) {
    tabs.push({
      label: "Session",
      value: "session",
      content: <CurrentSessionSettings />,
    });
  }

  const save = () => {
    // api().close();
    const newState = { ...appSettings() };
    saveToStorage(personaSettingsKey, appSettings());
    toast("Settings saved");
  };

  return (
    <div class={settingRootStyle}>
      <Texte size="bigger" >Settings</Texte>
      <Tabs items={tabs} value={tabs[0].value}></Tabs>
      <Flex center>
        <Button onClick={save}>
          <FaSolidFloppyDisk style={{ "margin-right": "10px" }} />
          <Texte>Save</Texte>
        </Button>
      </Flex>
    </div>
  );
};
