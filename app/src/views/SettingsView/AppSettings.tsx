import { createMemo } from "solid-js";
import {
  appSettings,
  currentFont,
  currentTheme,
  currentThemeIdx,
  fontfamily,
  personaSettingsKey,
  saveToStorage,
  setCurrentFont,
  setCurrentTheme,
  themeList,
  themeMap,
} from "~/common";
import { Flex, Input, Select, SelectOption, Texte } from "~/components";
import { SettingFieldStyle, settingFieldStyle } from "./styles.css";

export const AppSettings = () => {
  const switchTheme = (item: SelectOption | null) => {
    if (!item) return;
    const prev = themeMap[currentTheme()];
    if (prev) {
      document.documentElement.classList.remove(prev);
    }
    setCurrentTheme(item.value);
    document.documentElement.classList.add(themeMap[item.value]);
    const newState = { ...appSettings() };
    newState.app.theme = item.value;
    saveToStorage(personaSettingsKey, newState);
  };

  const switchFont = (item: SelectOption | null) => {
    if (!item) return;
    const prev = currentFont();
    if (!prev) return;
    setCurrentFont(item.value);
    const newState = { ...appSettings() };
    newState.app.font = item.value;
    saveToStorage(personaSettingsKey, newState);
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
      <div class={settingFieldStyle}>
        <Texte size="small" themeColor="secondary">Language</Texte>
        <Input value={appSettings().app.lang} />
      </div>
      <div class={settingFieldStyle}>
        <Texte size="small" themeColor="secondary">Theme</Texte>
        <Select
          label=""
          options={() => themeList}
          onChange={switchTheme}
          selected={currentThemeIdx}
        />
      </div>
      <div class={settingFieldStyle}>
        <Texte size="small" themeColor="secondary">Font</Texte>
        <Select
          label=""
          options={fonts}
          onChange={switchFont}
          selected={currentFontIdx}
        />
      </div>
    </Flex>
  );
};
