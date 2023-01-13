import { settingsData } from "~/common";
import { Flex, Input, Texte } from "~/components";

export const IdentSettings = () => {
  return (
    <Flex dn="column" style={{ gap: "10px" }}>
      <Flex
        style={{ padding: "5px", gap: "10px", "margin-top": "5px" }}
        vcenter
      >
        <Texte>ID</Texte>
        <Texte>{settingsData().ident.browserID}</Texte>
      </Flex>
      <Flex style={{ padding: "5px", gap: "10px" }} vcenter>
        <Texte>Username</Texte>
        <Input value={settingsData().ident.username} />
      </Flex>
      <Flex style={{ padding: "5px", gap: "10px" }} vcenter>
        <Texte>Color</Texte>
        <Input value={settingsData().ident.color} />
      </Flex>
    </Flex>
  );
};
