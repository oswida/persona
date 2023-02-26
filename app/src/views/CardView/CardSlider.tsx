import { FaSolidDeleteLeft, FaSolidEye } from "solid-icons/fa";
import { createMemo, createSignal, For } from "solid-js";
import { CardData, cardsData, sessionCards } from "~/common";
import {
  Accordion,
  AccordionDesc,
  Button,
  Flex,
  Input,
  Markdown,
  Texte,
} from "~/components";
import { InfoState, setInfoData } from "~/components/Dialog/InfoDialog";
import { CardItem } from "./CardItem";
import { CardSliderStyle, CardStyle } from "./styles.css";

export const CardSlider = () => {
  const [filter, setFilter] = createSignal("");
  let refFlt: HTMLInputElement;

  const items = createMemo(() => {
    return Object.values(cardsData())
      .filter(
        (it) =>
          filter() == "" ||
          it.title.toLowerCase().includes(filter().toLowerCase())
      )
      .filter((it) => sessionCards().includes(it.id))
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((it) => {
        return it;
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

  const showInfo = (item: CardData) => {
    setInfoData({
      isOpen: true,
      title: item.title,
      content: item.content,
      width: "33em",
    } as InfoState);
  };

  return (
    <div class={CardSliderStyle}>
      <div
        style={{
          height: "250px",
          width: "340px",
          overflow: "auto",
          "margin-bottom": "5px",
        }}
      >
        <For each={items()}>
          {(it) => (
            <Button
              size="small"
              border="none"
              shape="icon"
              style={{}}
              onClick={() => showInfo(it)}
            >
              <Texte weight={700}>{it.title}</Texte>
            </Button>
          )}
        </For>
      </div>
      <Flex
        vcenter
        style={{ "justify-content": "flex-end", "align-self": "flex-end" }}
      >
        <Texte size="small">Filter: </Texte>
        <Input
          style={{ width: "200px" }}
          fontSize="smaller"
          underline
          transparent
          ref={(e) => (refFlt = e)}
          onInput={flt}
        />
        <Button onClick={clear} size="small">
          <FaSolidDeleteLeft />
        </Button>
      </Flex>
    </div>
  );
};
