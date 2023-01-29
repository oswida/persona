import { stringify } from "node:querystring";
import { it } from "node:test";
import {
  FaSolidFloppyDisk,
  FaSolidLeftLong,
  FaSolidPencil,
  FaSolidTrash,
} from "solid-icons/fa";
import { createEffect, createMemo, createSignal, Show } from "solid-js";
import {
  CardData,
  cardsData,
  personaCardsKey,
  personaSessionsKey,
  PlaySession,
  saveGenericData,
  sessionCards,
  sessionData,
  setCardsData,
  setSessionData,
  themeVars,
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
  const [os, setOs] = createSignal(false);
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
  };

  const putIntoSession = (v: boolean) => {
    if (sessionData().current.trim() == "") return false;
    let list: Record<string, PlaySession>;
    const newState = { ...sessionData() };
    if (newState.hosting) {
      list = newState.hosted;
      if (!list) return;
    } else {
      list = newState.client;
      if (!list) return false;
    }
    if (v) {
      list[newState.current].cards[item.id] = item;
    } else {
      const c: Record<string, CardData> = {};
      Object.values(list[newState.current].cards).forEach((it) => {
        if (it.id != item.id) {
          c[it.id] = it;
        }
      });
      list[newState.current].cards = c;
    }
    setSessionData(newState);
    saveGenericData(personaSessionsKey, newState);
  };

  createEffect(() => {
    // console.log(sessionData());
  });

  return (
    <div class={CardStyle}>
      <Flex style={{ "justify-content": "space-between" }}>
        <Flex style={{ gap: "10px" }}>
          <Button onClick={deleteCard} title="Delete card" size="small">
            <FaSolidTrash color={themeVars.color.secondary} />
          </Button>
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
          <Checkbox
            label="Current session"
            color={themeVars.color.secondary}
            onChange={(v) => putIntoSession(v)}
            value={sessionCards()[item.id] != undefined}
          />
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
