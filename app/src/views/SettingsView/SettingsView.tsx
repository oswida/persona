import { FaSolidFloppyDisk } from "solid-icons/fa";
import { Setter } from "solid-js";
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
