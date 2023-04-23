import { createMemo, createSignal } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import {
  CardData,
  appAssets,
  appCards,
  appSettings,
  personaAssetsKey,
  personaCardsKey,
  saveToStorage,
  setAppStore,
} from "~/common";
import {
  AccordionDesc,
  StrInputState,
  Texte,
  setStrInputData,
} from "~/components";
import { CardItem } from "./CardItem";
import { AccordionListView } from "../AccordionListView";

export const CardView = () => {
  const [filter, setFilter] = createSignal("");

  const create = () => {
    setStrInputData({
      open: true,
      title: "Create card",
      message: "Input card name",
      value: "card",
      accept: (value: string) => {
        const id = uuidv4();
        const val = {
          id: id,
          owner: appSettings().ident.browserID,
          title: value,
          content: "Sample content",
          footer: "",
          isPublic: false,
        } as CardData;
        const newState = { ...appCards(), [id]: val };
        saveToStorage(personaCardsKey, newState);
      },
      width: "15em",
    } as StrInputState);
  };

  const items = createMemo(() => {
    return Object.values(appCards())
      .filter((it) => filter() == "" || it.title.toLowerCase().includes(filter().toLowerCase()))
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((it) => {
        return {
          title: <Texte weight={700}>{it.title}</Texte>,
          value: it.id,
          content: <CardItem item={it} />,
        } as AccordionDesc;
      });
  });

  const cardCount = createMemo(() => {
    return Object.keys(items()).length;
  });

  return <AccordionListView
    title="Cards"
    count={cardCount}
    create={create}
    items={items}
    applyFilter={(value: string) => setFilter(value)}
  />

};
