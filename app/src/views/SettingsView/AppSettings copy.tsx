import {
  currentSession,
  currentThemeIdx,
  personaSessionsKey,
  saveGenericData,
  sessionData,
  settingsData,
  themeList,
} from "~/common";
import { Flex, Input, Select, Texte } from "~/components";
import { SettingFieldStyle } from "./styles.css";

export const CurrentSessionSettings = () => {
  const bkg = (e: any) => {
    const data = { ...sessionData() };
    let sess = currentSession();
    if (!data || !data.current || !sess) return;
    sess.backgroundImg = e.target.value;
    saveGenericData(personaSessionsKey, data);
  };

  return (
    <Flex dn="column" style={{ gap: "10px" }}>
      <Flex class={SettingFieldStyle} vcenter>
        <Texte>Background image URI</Texte>
        <Input value={currentSession()?.backgroundImg} onChange={bkg} />
      </Flex>
    </Flex>
  );
};
