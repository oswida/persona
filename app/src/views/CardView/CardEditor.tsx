import {
  FaSolidAddressCard,
  FaSolidDeleteLeft,
  FaSolidEarthEurope,
  FaSolidFloppyDisk,
  FaSolidTrash,
  FaSolidUpload,
} from "solid-icons/fa";
import { Accessor, createSignal, For, JSX, Show } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import {
  CardData,
  cardsData,
  personaCardsKey,
  personaSettingsKey,
  PlaySession,
  saveGenericData,
  setCardsData,
  setSettingsData,
  settingsData,
} from "~/common";
import { Button, Flex, Input, InputArea, showToast, Texte } from "~/components";

export const CardEditor = () => {
  let refTitle: HTMLInputElement;
  let refContent: HTMLDivElement;
  let refFooter: HTMLDivElement;
  let refFilter: HTMLInputElement;
  const [selectedItem, setSelectedItem] = createSignal<CardData>();
  const [api, setApi] = createSignal<
    Accessor<{
      isPressed: boolean;
      pressableProps: JSX.HTMLAttributes<any>;
    }>
  >();
  const [cfilter, setCFilter] = createSignal("");

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
    select(value);
  };

  const del = () => {
    const item = selectedItem();
    if (!item) return;
    const data = cardsData();
    if (!data) return;
    const vals = Object.values(data).filter((v) => v.id != item.id);
    const newState = {};
    Object.assign(newState, vals);
    setCardsData(newState);
    saveGenericData(personaCardsKey, newState);
    setSelectedItem(undefined);
    if (!refContent || !refFooter || !refTitle) return;
    refContent.innerText = "";
    refFooter.innerText = "";
    refTitle.value = "";
  };

  const select = (value: CardData) => {
    setSelectedItem(value);
    if (!refTitle || !refContent || !refFooter) return;
    refTitle.value = value.title;
    refContent.innerText = value.content;
    refFooter.innerText = value.footer;
  };

  const flt = (e: any) => {
    setCFilter(e.target.value);
  };

  const fltClear = () => {
    setCFilter("");
    if (!refFilter) return;
    refFilter.value = "";
  };

  const update = () => {
    const item = selectedItem();
    if (!item || !refContent || !refFooter || !refTitle) return;

    const newState = { ...cardsData() };
    newState[item.id] = {
      id: item.id,
      title: refTitle.value,
      content: refContent.innerText,
      footer: refFooter.innerText,
      isPublic: item.isPublic,
    } as CardData;
    setCardsData(newState);
    saveGenericData(personaCardsKey, newState);
  };

  const togglePublic = () => {
    const item = selectedItem();
    if (!item) return;
    const newState = { ...cardsData() };
    newState[item.id] = {
      ...newState[item.id],
      isPublic: !newState[item.id].isPublic,
    };
    setCardsData(newState);
    saveGenericData(personaCardsKey, newState);
  };

  const putCardToSession = () => {
    const sett = { ...settingsData() };
    if (sett.app.sessions.current != "") {
      let session: PlaySession | undefined = undefined;
      if (sett.app.sessions.hosting) {
        session = sett.app.sessions.hosted[sett.app.sessions.current];
        if (!session) return;
      } else {
        session = sett.app.sessions.client[sett.app.sessions.current];
        if (!session) return;
      }
      const item = selectedItem();
      if (!item) return;
      session.cards[item.id] = item;
      setSettingsData(sett);
      saveGenericData(personaSettingsKey, sett);
      showToast(<Texte>Card added to the current session</Texte>);
    }
  };

  return (
    <Flex>
      <Flex dn="column">
        <div class={CardListboxStyle} style={currentStyle()}>
          <For
            each={Object.values(cardsData()).filter(
              (it) => cfilter() == "" || it.title.includes(cfilter())
            )}
          >
            {(it) => (
              <div
                class={CardListboxItemStyle({
                  selected: it.id == selectedItem()?.id,
                })}
                onClick={() => select(it)}
              >
                <Texte>{it.title}</Texte>
                <Show when={it.isPublic}>
                  <FaSolidEarthEurope />
                </Show>
              </div>
            )}
          </For>
        </div>
        <Flex style={{ gap: "10px" }}>
          <Input
            onInput={flt}
            underline
            transparent
            fontSize="small"
            ref={(e) => (refFilter = e)}
          />
          <Button onClick={fltClear}>
            <FaSolidDeleteLeft />
          </Button>
          <Button title="New" onClick={create}>
            <FaSolidAddressCard />
          </Button>
          <Button onClick={del}>
            <FaSolidTrash />
          </Button>
        </Flex>
      </Flex>
      <Flex dn="column">
        <Texte size="small">Title</Texte>
        <Input value={selectedItem()?.title} ref={(e) => (refTitle = e)} />
        <Texte size="small">Content</Texte>
        <InputArea
          style={{ height: "15.5rem", width: "500px" }}
          contentEditable
          ref={(e) => (refContent = e)}
        >
          {selectedItem()?.content}
        </InputArea>
        <Texte size="small">Footer</Texte>
        <InputArea
          style={{ height: "2.5rem", width: "500px" }}
          contentEditable
          ref={(e) => (refFooter = e)}
        >
          {selectedItem()?.footer}
        </InputArea>
        <Flex style={{ "justify-content": "flex-end", gap: "15px" }}>
          <Button onClick={update} title="Update card data">
            <FaSolidFloppyDisk />
          </Button>
          <Button onClick={togglePublic} title="Toggle card public">
            <FaSolidEarthEurope />
          </Button>
          <Button
            onClick={putCardToSession}
            title="Put card to current session"
          >
            <FaSolidUpload />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
