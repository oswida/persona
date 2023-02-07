import {
  VirtualContainer,
  VirtualItemProps,
} from "@minht11/solid-virtual-container";
import { FaSolidDeleteLeft } from "solid-icons/fa";
import { createMemo, createSignal } from "solid-js";
import { CardData, cardsData, sessionCards } from "~/common";
import { Button, Flex, Input, Texte } from "~/components";
import { CardSliderItem, CardSliderStyle } from "./styles.css";

const ListItem = (props: VirtualItemProps<CardData>) => {
  return (
    <div
      // Required for items to switch places.
      style={props.style}
      // Use CSS to set width to 100% or any other value.
      class={CardSliderItem}
      // Used for keyboard navigation and accessibility.
      tabIndex={props.tabIndex}
      role="listitem"
    >
      <span>{props.item.title}</span>
    </div>
  );
};

export const CardSlider = () => {
  const [filter, setFilter] = createSignal("");
  let scrollTargetElement!: HTMLDivElement;
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

  return (
    <div class={CardSliderStyle} ref={(e) => (scrollTargetElement = e)}>
      <div
        style={{
          height: "250px",
          width: "340px",
          overflow: "auto",
          "margin-bottom": "5px",
        }}
      >
        <VirtualContainer
          items={items()}
          scrollTarget={scrollTargetElement}
          itemSize={{ height: 50, width: 330 }}
          direction="vertical"
        >
          {ListItem}
        </VirtualContainer>
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
