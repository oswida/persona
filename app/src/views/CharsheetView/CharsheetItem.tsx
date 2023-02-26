import { FaSolidPencil, FaSolidTrash } from "solid-icons/fa";
import { Component, createMemo, Show } from "solid-js";
import {
  charsheetData,
  CharsheetData,
  csTemplateList,
  netPublish,
  personaCharsheetKey,
  saveGenericData,
  setCharsheetData,
  themeVars,
} from "~/common";
import {
  Button,
  Checkbox,
  ConfirmState,
  Flex,
  setConfirmData,
  setStrInputData,
  StrInputState,
  Texte,
} from "~/components";
import { CsItemStyle } from "./styles.css";

type Props = {
  item: CharsheetData;
};

export const CharsheetItem: Component<Props> = ({ item }) => {
  const editName = () => {
    setStrInputData({
      open: true,
      title: "Edit name",
      message: "",
      value: item.name,
      accept: (value: string) => {
        const newState = { ...charsheetData() };
        newState[item.id].name = value;
        setCharsheetData(newState);
        saveGenericData(personaCharsheetKey, newState);
        //TODO:  netPublish(topicC, [item]);
      },
    } as StrInputState);
  };

  const deleteCharsheet = () => {
    setConfirmData({
      open: true,
      title: "Delete charsheet",
      message: `Do you really want to delete ${item.name}?`,
      accept: () => {
        const data = charsheetData();
        if (!data) return;
        const vals = Object.values(data).filter((v) => v.id != item.id);
        const newState = {};
        Object.assign(newState, vals);
        setCharsheetData(newState);
        saveGenericData(personaCharsheetKey, newState);
        //TODO: netPublish(topicCardDelete, [item.id]);
      },
    } as ConfirmState);
  };

  const editContent = () => {};

  const putIntoSession = (mode: boolean) => {};

  const tpl = createMemo(() => {
    return csTemplateList()[item.templateId];
  });

  return (
    <div class={CsItemStyle}>
      <Flex style={{ "justify-content": "space-between" }}>
        <Flex style={{ gap: "10px" }}>
          <Button
            onClick={deleteCharsheet}
            title="Delete charsheet"
            size="small"
          >
            <FaSolidTrash color={themeVars.color.secondary} />
          </Button>
        </Flex>

        <Flex>
          <Button size="small" onClick={editName}>
            <FaSolidPencil color={themeVars.color.secondary} />
            <Texte size="small">Name</Texte>
          </Button>
          <Button size="small" onClick={editContent}>
            <FaSolidPencil color={themeVars.color.secondary} />
            <Texte size="small">Content</Texte>
          </Button>
          <Checkbox
            label="Session"
            title="Card in current session"
            color={themeVars.color.secondary}
            onChange={(v) => putIntoSession(v)}
            //TODO:   value={sessionCards().includes(item.id)}
          />
        </Flex>
      </Flex>
      <Texte>Player: {item.playerName}</Texte>
      <Texte>Template: {tpl().name}</Texte>
    </div>
  );
};
