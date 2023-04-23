import { FaSolidPencil, FaSolidPlus, FaSolidTrash } from "solid-icons/fa";
import { Show } from "solid-js";
import {
  appCards,
  appSettings,
  CardData,
  netPublish,
  personaCardsKey,
  saveToStorage,
  themeVars,
  topicCardDelete,
  topicCardUpdate,
} from "~/common";
import {
  Button,
  Flex,
  setStrInputData,
  StrInputState,
  Texte,
} from "~/components";
import {
  ConfirmState,
  setConfirmData,
} from "~/components/Dialog/ConfirmDialog";
import { CardStyle } from "./styles.css";
import { addCard } from "../WhiteboardView/helper";

export const CardItem = ({ item }: { item: CardData }) => {

  const deleteCard = () => {
    setConfirmData({
      open: true,
      title: "Delete card",
      message: `Do you really want to delete ${item.title}?`,
      accept: () => {
        const data = appCards();
        if (!data) return;
        const newState = { ...Object.values(data).filter((v) => v.id != item.id) };
        saveToStorage(personaCardsKey, newState);
        netPublish(topicCardDelete, [item.id]);
      },
    } as ConfirmState);
  };

  const editTitle = () => {
    setStrInputData({
      open: true,
      title: "Edit title",
      message: "",
      value: item.title,
      accept: (value: string) => {
        const newState = {
          ...appCards(), [item.id]: {
            ...appCards()[item.id], title: value
          }
        };
        saveToStorage(personaCardsKey, newState);
        netPublish(topicCardUpdate, [item]);
      },
    } as StrInputState);
  };

  const editContent = () => {
    setStrInputData({
      open: true,
      title: "Edit",
      message: item.title,
      value: item.content,
      accept: (value: string) => {
        const newState = {
          ...appCards(), [item.id]: {
            ...appCards()[item.id], content: value
          }
        };
        saveToStorage(personaCardsKey, newState);
        netPublish(topicCardUpdate, [item]);
      },
      height: "8em",
      multiline: true
    } as StrInputState);
  };

  const putCardOnTable = () => {
    addCard(item.id, 100, 100);
  }

  return (
    <div class={CardStyle}>
      <Show when={item.owner == appSettings().ident.browserID}>
        <Flex style={{ "justify-content": "space-between" }}>
          <Flex style={{ gap: "10px" }}>
            <Button onClick={deleteCard} title="Delete card" size="small">
              <FaSolidTrash color={themeVars.color.secondary} />
            </Button>
          </Flex>
          <Flex>
            <Button size="small" onClick={editTitle}>
              <FaSolidPencil color={themeVars.color.secondary} />
              <Texte size="small">Title</Texte>
            </Button>
            <Button size="small" onClick={editContent}>
              <FaSolidPencil color={themeVars.color.secondary} />
              <Texte size="small">Content</Texte>
            </Button>
            <Button size="small" shape="icon" title="Put card on table" onClick={putCardOnTable}>
              <FaSolidPlus />
            </Button>
          </Flex>
        </Flex>
      </Show>
      <Flex style={{ "margin-top": "10px", "white-space": "pre-line" }}>
        {item.content}
      </Flex>
      <Show when={item.footer && item.footer.trim() != ""}>
        <Flex>{item.footer}</Flex>
      </Show>
    </div>
  );
};
