import {
  appAssets,
  appSessions,
  currentSession,
  personaSessionsKey,
  saveToStorage,
} from "~/common";
import { Flex, Input, Select, SelectOption, Texte } from "~/components";
import { settingFieldStyle } from "./styles.css";
import { Dynamic } from "solid-js/web";
import { createEffect, createMemo, createSignal } from "solid-js";

export const CurrentSessionSettings = () => {

  const selectedItem = createMemo(() => {
    const session = currentSession();
    if (!session) return -1;
    const opt = Object.values(appAssets());
    for (let i = 0; i < opt.length; i++) {
      if (opt[i].id == session.backgroundImg) {
        return i;
      }
    }
    return -1;
  });


  const bkgOptions = createMemo(() => {
    return Object.values(appAssets()).map((it) => {
      return { label: it.name, value: it.id } as SelectOption
    });
  });

  const bkgSelect = (details: SelectOption | null) => {
    const value = details ? details.value : "";
    const data = { ...appSessions() };
    if (!data || !data.current) return;
    let sess;
    if (data.hosting) {
      sess = data.hosted[data.current];
    } else {
      sess = data.client[data.current];
    }
    sess.backgroundImg = value;
    saveToStorage(personaSessionsKey, data);
  };

  return (
    <Flex dn="column" style={{ gap: "10px" }}>
      <div class={settingFieldStyle}>
        <Texte size="small" themeColor="secondary">Background image URI</Texte>
        <Dynamic
          component={Select}
          label=""
          options={bkgOptions}
          selected={selectedItem}
          onChange={bkgSelect}
        />
      </div>
    </Flex>
  );
};
