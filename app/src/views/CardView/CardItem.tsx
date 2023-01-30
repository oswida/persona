import { FaSolidFloppyDisk, FaSolidPencil, FaSolidTrash } from "solid-icons/fa";
import { createSignal, Show } from "solid-js";
import {
  CardData,
  cardsData,
  netPublish,
  personaCardsKey,
  personaSessionsKey,
  PlaySession,
  saveGenericData,
  sessionCards,
  sessionData,
  setCardsData,
  setSessionData,
  settingsData,
  themeVars,
  topicCardDelete,
  topicCardUpdate,
  topicSessionInfo,
} from "~/common";
import {
  Button,
  Checkbox,
  Flex,
  InputArea,
  Markdown,
  setStrInputData,
  StrInputState,
  Texte,
} from "~/components";
import {
  ConfirmState,
  setConfirmData,
} from "~/components/Dialog/ConfirmDialog";
import { CardStyle } from "./styles.css";

export const CardItem = ({ item }: { item: CardData }) => {
  const [edc, setEdc] = createSignal(false);
  let refContent: HTMLDivElement;

  const deleteCard = () => {
    setConfirmData({
      open: true,
      title: "Delete card",
      message: `Do you really want to delete ${item.title}?`,
      accept: () => {
        const data = cardsData();
        if (!data) return;
        const vals = Object.values(data).filter((v) => v.id != item.id);
        const newState = {};
        Object.assign(newState, vals);
        setCardsData(newState);
        saveGenericData(personaCardsKey, newState);
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
        const newState = { ...cardsData() };
        newState[item.id].title = value;
        setCardsData(newState);
        saveGenericData(personaCardsKey, newState);
        netPublish(topicCardUpdate, [item]);
      },
    } as StrInputState);
  };

  const editContent = () => {
    setEdc(true);
  };

  const editContentUpdate = () => {
    setEdc(false);
    if (!refContent) return;

    const newState = { ...cardsData() };
    newState[item.id].content = refContent.innerText;
    setCardsData(newState);
    saveGenericData(personaCardsKey, newState);
    netPublish(topicCardUpdate, [item]);
  };

  const putIntoSession = (v: boolean) => {
    if (sessionData().current.trim() == "") return;
    let list: Record<string, PlaySession>;
    const newState = { ...sessionData() };
    if (newState.hosting) {
      list = newState.hosted;
      if (!list) return;
    } else {
      list = newState.client;
      if (!list) return;
    }
    if (v) {
      if (list[newState.current].cards.includes(item.id)) return;
      list[newState.current].cards.push(item.id);
      netPublish(topicCardUpdate, [item]);
    } else {
      if (!list[newState.current].cards.includes(item.id)) return;
      list[newState.current].cards = list[newState.current].cards.filter(
        (it) => it != item.id
      );
      netPublish(topicCardDelete, [item.id]);
    }
    setSessionData(newState);
    saveGenericData(personaSessionsKey, newState);
    netPublish(topicSessionInfo, list[newState.current]);
  };

  return (
    <div class={CardStyle}>
      <Flex style={{ "justify-content": "space-between" }}>
        <Flex style={{ gap: "10px" }}>
          <Show when={item.owner == settingsData().ident.browserID}>
            <Button onClick={deleteCard} title="Delete card" size="small">
              <FaSolidTrash color={themeVars.color.secondary} />
            </Button>
          </Show>
        </Flex>

        <Flex>
          <Show when={!edc()}>
            <Button size="small" onClick={editTitle}>
              <FaSolidPencil color={themeVars.color.secondary} />
              <Texte size="small">Title</Texte>
            </Button>
            <Button size="small" onClick={editContent}>
              <FaSolidPencil color={themeVars.color.secondary} />
              <Texte size="small">Content</Texte>
            </Button>
          </Show>
          <Show when={edc()}>
            <Button size="small" onClick={editContentUpdate}>
              <FaSolidFloppyDisk color={themeVars.color.secondary} />
              <Texte size="small">Update</Texte>
            </Button>
          </Show>
          {/* <Button size="small" onClick={editFooter}>
            <FaSolidPencil color={themeVars.color.secondary} />
            <Texte size="small">Footer</Texte>
          </Button> */}
          <Show when={item.owner == settingsData().ident.browserID}>
            <Checkbox
              label="Current session"
              color={themeVars.color.secondary}
              onChange={(v) => putIntoSession(v)}
              value={sessionCards().includes(item.id)}
            />
          </Show>
        </Flex>
      </Flex>
      <Flex style={{ "margin-top": "10px" }}>
        <Show when={edc()}>
          <InputArea
            transparent
            style={{ width: "100%", "max-height": "55vh" }}
            contentEditable={true}
            border="full"
            ref={(e) => (refContent = e)}
          >
            {item.content}
          </InputArea>
        </Show>
        <Show when={!edc()}>
          <Markdown content={item.content} />
        </Show>
      </Flex>
      <Show when={item.footer && item.footer.trim() != ""}>
        <Flex>{item.footer}</Flex>
      </Show>
    </div>
  );
};
