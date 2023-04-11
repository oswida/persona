import { appSettings, personaSettingsKey, saveToStorage, storageSize } from "~/common";
import { Flex, Input, Texte } from "~/components";
import { settingFieldStyle } from "./styles.css";
import { Dynamic } from "solid-js/web";

export const IdentSettings = () => {
  let refName: HTMLInputElement;
  let refColor: HTMLInputElement;

  const update = () => {
    const newState = { ...appSettings() };
    newState.ident.username = refName.value;
    newState.ident.color = refColor.value;
    saveToStorage(personaSettingsKey, newState);
  };

  return (
    <Flex dn="column" style={{ gap: "10px" }}>
      <div class={settingFieldStyle}>
        <Texte size="small" themeColor="secondary">ID</Texte>
        <Texte size="small">{appSettings().ident.browserID}</Texte>
      </div>
      <div class={settingFieldStyle}>
        <Texte size="small" themeColor="secondary">Storage</Texte>
        <Dynamic component={Texte} size="small">
          {storageSize() / 1000} KB
        </Dynamic>
      </div>
      <div class={settingFieldStyle}>
        <Texte size="small" themeColor="secondary">Username</Texte>
        <Input
          value={appSettings().ident.username}
          onChange={update}
          ref={(e) => (refName = e)}
        />
      </div>
      <div class={settingFieldStyle}>
        <Texte size="small" themeColor="secondary">Color</Texte>
        <Input
          value={appSettings().ident.color}
          onChange={update}
          ref={(e) => (refColor = e)}
        />
      </div>
    </Flex>
  );
};
