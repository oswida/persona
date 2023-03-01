import { Component, createMemo, Show } from "solid-js";
import {
  charsheetData,
  CharsheetData,
  csTemplateList,
  currentSession,
  personaCharsheetKey,
  saveGenericData,
  setCharsheetData,
} from "~/common";
import {
  ConfirmState,
  setConfirmData,
  setStrInputData,
  StrInputState,
  Texte,
} from "~/components";
import { CsItemStyle } from "./styles.css";

type Props = {
  item: CharsheetData;
};

export const CharsheetItem: Component<Props> = ({ item }) => {
  const inSession = createMemo(() => {
    const sess = currentSession();
    return sess?.charsheets.includes(item.id);
  });

  const tpl = createMemo(() => {
    return csTemplateList()[item.templateId];
  });

  return (
    <div class={CsItemStyle}>
      <Texte>Player: {item.playerName}</Texte>
      <Texte>Updated: {item.lastUpdate}</Texte>
      <Show when={inSession()}>
        <Texte size="small" themeColor="secondary">
          Current session
        </Texte>
      </Show>
    </div>
  );
};
