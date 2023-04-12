import { FaSolidEarthEurope, FaSolidFloppyDisk, FaSolidPencil, FaSolidTrash, FaSolidUsers } from "solid-icons/fa";
import { createMemo, createSignal, Show } from "solid-js";
import {
  appCards,
  appSessions,
  appSettings,
  CardData,
  netPublish,
  personaCardsKey,
  personaSessionsKey,
  PlaySession,
  saveToStorage,
  sessionCards,
  setAppStore,
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
        const data = appCards();
        if (!data) return;
        const vals = Object.values(data).filter((v) => v.id != item.id);
        const newState = {};
        Object.assign(newState, vals);
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
        const newState = { ...appCards() };
        newState[item.id].title = value;
        saveToStorage(personaCardsKey, newState);
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

    const newState = { ...appCards() };
    newState[item.id].content = refContent.innerText;
    saveToStorage(personaCardsKey, newState);
    netPublish(topicCardUpdate, [item]);
  };

  const putIntoSession = (v: boolean) => {
    if (appSessions().current.trim() == "") return;
    let list: Record<string, PlaySession>;
    const newState = { ...appSessions() };
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
    saveToStorage(personaSessionsKey, newState);
    netPublish(topicSessionInfo, list[newState.current]);
  };

  const isInSession = createMemo(() => {
    return sessionCards().includes(item.id);
  });

  const isPublic = createMemo(() => {
    return item.isPublic;
  })

  const togglePublic = () => {
    const cards = sessionCards();
    const newState = { ...appCards() };
    const c = Object.values(newState).filter((it) => {
      return it.id == item.id;
    });
    if (c.length <= 0) return;
    c[0].isPublic = !c[0].isPublic;
    saveToStorage(personaCardsKey, newState);
    netPublish(topicCardUpdate, [c[0]]);
  };


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

            <Button size="small" onClick={() => putIntoSession(!isInSession())} selected={isInSession}>
              {/* <FaSolidUsers color={isInSession() ? themeVars.color.background : themeVars.color.secondary} /> */}
              <Texte size="small">Session</Texte>
            </Button>

            <Button size="small" selected={isPublic} onClick={togglePublic}>
              {/* <FaSolidEarthEurope /> */}
              <Texte size="small">Public</Texte>
            </Button>


          </Flex>
        </Flex>
      </Show>
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
