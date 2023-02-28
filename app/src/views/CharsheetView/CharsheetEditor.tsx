import { Form, Template, Viewer } from "@pdfme/ui";
import {
  FaSolidArrowLeft,
  FaSolidArrowRight,
  FaSolidFilePen,
  FaSolidFloppyDisk,
  FaSolidTrash,
  FaSolidUserPen,
} from "solid-icons/fa";
import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  Show,
} from "solid-js";
import {
  charsheetData,
  CharsheetData,
  csTemplateList,
  editorState,
  personaCharsheetKey,
  prettyToday,
  saveGenericData,
  setCharsheetData,
  setEditorState,
  themeVars,
} from "~/common";
import {
  Button,
  ConfirmState,
  Flex,
  setConfirmData,
  setStrInputData,
  StrInputState,
} from "~/components";
import { CsEditStyle } from "./styles.css";

type Props = {
  cs: Accessor<CharsheetData | null | undefined>;
};

export const CharsheetEditor: Component<Props> = ({ cs }) => {
  let viewer: Viewer;
  let form: Form;
  const [editing, setEditing] = createSignal(false);

  createEffect(() => {
    const domContainer = document.getElementById("pdf-container")!;
    const c = cs();
    if (!domContainer || !c) return;
    const tpl = csTemplateList()[c.templateId];
    if (!tpl) return;
    const template: Template = {
      basePdf: tpl.file,
      schemas: tpl.schemas,
    };

    const inputs = c.values ? c.values : [{}];
    if (editing()) {
      if (viewer) viewer.destroy();
      form = new Form({ options: {}, domContainer, template, inputs });
    } else {
      if (form) form.destroy();
      viewer = new Viewer({ options: {}, domContainer, template, inputs });
    }

    // const zoomInBtn = document.querySelector(
    //   "#pdf-container > div > div > div:nth-child(1) > div > div > button:nth-child(3)"
    // ) as HTMLButtonElement;
    // const zoomInfo = document.querySelector(
    //   "#pdf-container > div > div > div:nth-child(1) > div > div > strong"
    // );
    // const currentZoom = zoomInfo?.innerHTML.toString().replaceAll("%", "");
    // if (!currentZoom) return;
    // const cz = Number.parseInt(currentZoom);
    // if (Number.isNaN(cz) || cz >= 175) return;
    // const t = (175 - cz) / 25;
    // for (let i = 0; i < t; i++) {
    //   zoomInBtn.click();
    // }
  });

  const editName = () => {
    const c = cs();
    if (!c) return;
    setStrInputData({
      open: true,
      title: "Edit name",
      message: "",
      value: c.name,
      accept: (value: string) => {
        const newState = { ...charsheetData() };
        newState[c.id].name = value;
        setCharsheetData(newState);
        saveGenericData(personaCharsheetKey, newState);
        //TODO:  netPublish(topicC, [item]);
      },
    } as StrInputState);
  };

  const save = () => {
    const c = cs();
    if (!form || !c) return;
    c.values = form.getInputs();
    const newState = { ...charsheetData() };
    newState[c.id] = {
      ...c,
      values: form.getInputs(),
      lastUpdate: prettyToday(),
    };
    setCharsheetData(newState);
    saveGenericData(personaCharsheetKey, newState);
    setEditing(false);
  };

  const putIntoSession = (mode: boolean) => {};

  const deleteCharsheet = () => {
    const c = cs();
    if (!c) return;
    setConfirmData({
      open: true,
      title: "Delete charsheet",
      message: `Do you really want to delete ${c.name}?`,
      accept: () => {
        const data = charsheetData();
        if (!data) return;
        const vals = Object.values(data).filter((v) => v.id != c.id);
        const newState = {};
        Object.assign(newState, vals);
        setCharsheetData(newState);
        saveGenericData(personaCharsheetKey, newState);
        //TODO: netPublish(topicCardDelete, [item.id]);
        if (form) form.destroy();
        if (viewer) viewer.destroy();
      },
    } as ConfirmState);
  };

  const toggleWidth = (inc: boolean) => {
    setEditorState((prev) => ({ ...prev, visible: false }));
    switch (editorState().size) {
      case "narrow":
        inc
          ? setEditorState((prev) => ({ size: "standard", visible: true }))
          : setEditorState((prev) => ({ size: "narrow", visible: true }));
        break;
      case "standard":
        inc
          ? setEditorState((prev) => ({ size: "wide", visible: true }))
          : setEditorState((prev) => ({ size: "narrow", visible: true }));
        break;
      case "wide":
        inc
          ? setEditorState((prev) => ({ size: "wide", visible: true }))
          : setEditorState((prev) => ({ size: "standard", visible: true }));
        break;
    }
  };

  return (
    <div
      class={CsEditStyle({
        size: editorState().size,
      })}
    >
      <div id="pdf-container" style={{ height: "100%", width: "100%" }}></div>
      <Flex
        style={{ "justify-content": "space-between", width: "max-content" }}
        dn="column"
      >
        <Flex dn="column">
          <Show when={!editing()}>
            <Button
              shape="icon"
              title="Edit charsheet content"
              onClick={() => setEditing(true)}
            >
              <FaSolidFilePen />
            </Button>
          </Show>
          <Show when={editing()}>
            <Button shape="icon" title="Save charsheet" onClick={save}>
              <FaSolidFloppyDisk />
            </Button>
          </Show>
          <Button
            size="small"
            onClick={editName}
            title="Edit character name"
            shape="icon"
          >
            <FaSolidUserPen />
          </Button>
          {/* <Show when={!inSession()}>
            <Button
              shape="icon"
              title="Edit charsheet content"
              onClick={() => putIntoSession()}
            >
              <FaSolidFilePen />
            </Button>
          </Show>
          <Show when={editing()}>
            <Button shape="icon" title="Save charsheet" onClick={save}>
              <FaSolidFloppyDisk />
            </Button>
          </Show> */}
        </Flex>
        <Flex vcenter dn="column">
          <Button
            onClick={() => toggleWidth(true)}
            title="Increase viewer width"
            size="small"
            shape="icon"
          >
            <FaSolidArrowRight />
          </Button>
          <Button
            onClick={() => toggleWidth(false)}
            title="Decrease viewer width"
            size="small"
            shape="icon"
          >
            <FaSolidArrowLeft />
          </Button>
        </Flex>
        <Flex vcenter>
          <Button
            onClick={deleteCharsheet}
            title="Delete charsheet"
            size="small"
            shape="icon"
          >
            <FaSolidTrash color={themeVars.color.secondary} />
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};
