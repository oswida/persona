import { Component, createMemo, Show } from "solid-js";
import {
  CharsheetData,
  csTemplateList,
  currentSession,
} from "~/common";
import {
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
