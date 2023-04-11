import {
  appSessions,
  currentSession,
  personaSessionsKey,
  saveToStorage,
} from "~/common";
import { Flex, Input, Texte } from "~/components";
import { settingFieldStyle } from "./styles.css";

export const CurrentSessionSettings = () => {
  const bkg = (e: any) => {
    const data = { ...appSessions() };
    let sess = currentSession();
    if (!data || !data.current || !sess) return;
    sess.backgroundImg = e.target.value;
    saveToStorage(personaSessionsKey, data);
  };

  return (
    <Flex dn="column" style={{ gap: "10px" }}>
      <div class={settingFieldStyle}>
        <Texte size="small" themeColor="secondary">Background image URI</Texte>
        <Input value={currentSession()?.backgroundImg} onChange={bkg} />
      </div>
    </Flex>
  );
};
