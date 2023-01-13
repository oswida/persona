import { settingsData } from "~/common";
import { Flex, Input, Texte } from "~/components";

export const AppSettings = () => {
  return (
    <Flex dn="column" style={{ gap: "10px" }}>
      <Flex
        style={{ padding: "5px", gap: "10px", "margin-top": "5px" }}
        vcenter
      >
        <Texte>Language</Texte>
        <Input value={settingsData().app.lang} />
      </Flex>
    </Flex>
  );
};
