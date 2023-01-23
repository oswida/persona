import { FaSolidPencil, FaSolidTrash } from "solid-icons/fa";
import { Show } from "solid-js";
import {
  CardData,
  cardsData,
  personaCardsKey,
  saveGenericData,
  setCardsData,
  themeVars,
} from "~/common";
import { Button, Checkbox, Flex } from "~/components";
import { CardStyle } from "./styles.css";

export const CardView = ({ item }: { item: CardData }) => {
  const deleteCard = () => {
    const data = cardsData();
    if (!data) return;
    const vals = Object.values(data).filter((v) => v.id != item.id);
    const newState = {};
    Object.assign(newState, vals);
    setCardsData(newState);
    saveGenericData(personaCardsKey, newState);
  };
  return (
    <div class={CardStyle}>
      <Flex style={{ "justify-content": "space-between" }}>
        <Flex style={{ gap: "10px" }}>
          <Button onClick={deleteCard}>
            <FaSolidTrash color={themeVars.color.secondary} />
          </Button>
          <Button>
            <FaSolidPencil color={themeVars.color.secondary} />
          </Button>
        </Flex>
        <Checkbox label="Public" color={themeVars.color.secondary} />
      </Flex>
      <Flex>{item.content}</Flex>
      <Show when={item.footer && item.footer.trim() != ""}>
        <Flex>{item.footer}</Flex>
      </Show>
    </div>
  );
};
