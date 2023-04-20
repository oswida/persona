import { FaSolidDeleteLeft, FaSolidPlus } from "solid-icons/fa";
import { createMemo, createSignal } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import {
  CardData,
  appCards,
  appSessions,
  appSettings,
  personaCardsKey,
  saveToStorage,
  sessionCards,
} from "~/common";
import {
  Accordion,
  AccordionDesc,
  Button,
  Checkbox,
  Flex,
  Input,
  Texte,
} from "~/components";
import { CardItem } from "./CardItem";
import { CardListStyle, CardZoneStyle } from "./styles.css";

export const CardList = () => {
  const [filter, setFilter] = createSignal("");
  const [onlySession, setOnlySession] = createSignal(false);
  const [onlyOwner, setOnlyOwner] = createSignal(false);

  let refFlt: HTMLInputElement;

  const create = () => {
    const newState = { ...appCards() };
    const id = uuidv4();
    const value = {
      id: id,
      owner: appSettings().ident.browserID,
      title: "New",
      content: "Sample **content**",
      footer: "",
      isPublic: false,
    } as CardData;
    newState[id] = value;
    saveToStorage(personaCardsKey, newState);
  };

  const items = createMemo(() => {
    return Object.values(appCards())
      .filter((it) => filter() == "" || it.title.includes(filter()))
      .filter((it) => !onlySession() || Object.keys(sessionCards()).includes(it.id))
      .filter(
        (it) => !onlyOwner() || appSettings().ident.browserID == it.owner
      )
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((it) => {
        return {
          title: <Texte weight={700}>{it.title}</Texte>,
          value: it.id,
          content: <CardItem item={it} />,
        } as AccordionDesc;
      });
  });

  const flt = () => {
    if (!refFlt) return;
    setFilter(refFlt.value.trim());
  };

  const clear = () => {
    if (!refFlt) return;
    setFilter("");
    refFlt.value = "";
  };

  const cardCount = createMemo(() => {
    return Object.keys(items()).length;
  });

  return (
    <div class={CardListStyle}>
      <Flex
        style={{
          "align-items": "center",
          "justify-content": "space-between",
          padding: "5px",
        }}
      >
        <Texte>Cards ({cardCount()})</Texte>
        <Button onClick={create} title="Add new card">
          <FaSolidPlus />
        </Button>
      </Flex>
      <Flex style={{ "justify-content": "flex-end", padding: "5px" }}>
        <Checkbox
          label="Only current session"
          value={onlySession()}
          onChange={(v) => setOnlySession(v)}
        />
        <Checkbox
          label="Only owned"
          value={onlyOwner()}
          onChange={(v) => setOnlyOwner(v)}
        />
      </Flex>
      <div class={CardZoneStyle}>
        <Accordion items={items} />
      </div>
      <Flex vcenter style={{ "justify-content": "flex-end" }}>
        <Texte>Filter: </Texte>
        <Input underline transparent ref={(e) => (refFlt = e)} onInput={flt} />
        <Button onClick={clear}>
          <FaSolidDeleteLeft />
        </Button>
      </Flex>
    </div>
  );
};
