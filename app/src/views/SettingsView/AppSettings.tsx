import {
  currentTheme,
  currentThemeIdx,
  setCurrentTheme,
  setSettingsData,
  settingsData,
  themeList,
  themeMap,
} from "~/common";
import { Flex, Input, Select, SelectOption, Texte } from "~/components";
import { SettingFieldStyle } from "./styles.css";

export const AppSettings = () => {
  const switchTheme = (item: SelectOption | null) => {
    if (!item) return;
    const prev = themeMap[currentTheme()];
    if (prev) {
      document.documentElement.classList.remove(prev);
    }
    setCurrentTheme(item.value);
    document.documentElement.classList.add(themeMap[item.value]);
    const newState = { ...settingsData() };
    newState.app.theme = item.value;
    setSettingsData(newState);
  };

  return (
    <Flex dn="column" style={{ gap: "10px" }}>
      <Flex class={SettingFieldStyle} vcenter>
        <Texte>Language</Texte>
        <Input value={settingsData().app.lang} />
      </Flex>
      <Flex class={SettingFieldStyle}>
        <Select
          label="Theme"
          options={() => themeList}
          onChange={switchTheme}
          selected={currentThemeIdx}
        />
      </Flex>
    </Flex>
  );
};
