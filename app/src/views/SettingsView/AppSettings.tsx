import { createMemo } from "solid-js";
import {
  currentFont,
  currentTheme,
  currentThemeIdx,
  fontfamily,
  setCurrentFont,
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

  const switchFont = (item: SelectOption | null) => {
    if (!item) return;
    const prev = currentFont();
    if (!prev) return;
    setCurrentFont(item.value);
    const newState = { ...settingsData() };
    newState.app.font = item.value;
    setSettingsData(newState);
  };

  const fonts = createMemo(() => {
    return Object.keys(fontfamily).map((it) => {
      return { label: it, value: fontfamily[it] } as SelectOption;
    });
  });

  const currentFontIdx = createMemo(() => {
    const f = Object.values(fontfamily);
    for (let i = 0; i < f.length; i++) {
      if (currentFont() == f[i]) return i;
    }
    return -1;
  });

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
      <Flex class={SettingFieldStyle}>
        <Select
          label="Font"
          options={fonts}
          onChange={switchFont}
          selected={currentFontIdx}
        />
      </Flex>
    </Flex>
  );
};
