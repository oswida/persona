import { setSettingsData, settingsData } from "~/common";
import { Flex, Input, Texte } from "~/components";

export const IdentSettings = () => {
  let refName: HTMLInputElement;
  let refColor: HTMLInputElement;

  const update = () => {
    const newState = { ...settingsData() };
    newState.ident.username = refName.value;
    newState.ident.color = refColor.value;
    setSettingsData(newState);
  };

  return (
    <Flex dn="column" style={{ gap: "10px" }}>
      <Flex
        style={{ padding: "5px", gap: "10px", "margin-top": "5px" }}
        vcenter
      >
        <Texte>ID</Texte>
        <Texte size="small">{settingsData().ident.browserID}</Texte>
      </Flex>
      <Flex style={{ padding: "5px", gap: "10px" }} vcenter>
        <Texte>Username</Texte>
        <Input
          value={settingsData().ident.username}
          onChange={update}
          ref={(e) => (refName = e)}
        />
      </Flex>
      <Flex style={{ padding: "5px", gap: "10px" }} vcenter>
        <Texte>Color</Texte>
        <Input
          value={settingsData().ident.color}
          onChange={update}
          ref={(e) => (refColor = e)}
        />
      </Flex>
    </Flex>
  );
};
