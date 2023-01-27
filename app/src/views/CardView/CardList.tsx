import {
  CardData,
  cardsData,
  personaCardsKey,
  saveGenericData,
  setCardsData,
} from "~/common";
import { v4 as uuidv4 } from "uuid";
import { createMemo, createSignal } from "solid-js";
import { CardListStyle, CardZoneStyle } from "./styles.css";
import {
  Accordion,
  AccordionDesc,
  Button,
  Flex,
  Input,
  Texte,
} from "~/components";
import { FaSolidDeleteLeft, FaSolidPlus } from "solid-icons/fa";
import { CardItem } from "./CardItem";

export const CardList = () => {
  const [filter, setFilter] = createSignal("");
  let refFlt: HTMLInputElement;

  const create = () => {
    const newState = { ...cardsData() };
    const id = uuidv4();
    const value = {
      id: id,
      title: "New",
      content: "",
      footer: "",
      isPublic: false,
    } as CardData;
    newState[id] = value;
    setCardsData(newState);
    saveGenericData(personaCardsKey, newState);
  };

  const items = createMemo(() => {
    return Object.values(cardsData())
      .filter((it) => filter() == "" || it.title.includes(filter()))
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((it) => {
        return {
          title: it.title,
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

  return (
    <div class={CardListStyle}>
      <Flex style={{ "align-items": "center" }}>
        <Texte>Cards</Texte>
        <Button onClick={create}>
          <FaSolidPlus />
        </Button>
        <Input
          underline
          transparent
          fontSize="small"
          ref={(e) => (refFlt = e)}
          onInput={flt}
        />
        <Button onClick={clear}>
          <FaSolidDeleteLeft />
        </Button>
      </Flex>
      <div class={CardZoneStyle}>
        <Accordion items={items} />
      </div>
    </div>
  );
};
