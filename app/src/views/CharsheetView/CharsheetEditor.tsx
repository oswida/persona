import { Form, Template, Viewer } from "@pdfme/ui";
import { FaSolidFloppyDisk, FaSolidPencil, FaSolidTrash } from "solid-icons/fa";
import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  Setter,
  Show,
} from "solid-js";
import {
  charsheetData,
  CharsheetData,
  csTemplateList,
  personaCharsheetKey,
  prettyToday,
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

    const zoomInBtn = document.querySelector(
      "#pdf-container > div > div > div:nth-child(1) > div > div > button:nth-child(3)"
    ) as HTMLButtonElement;
    console.log("zoomBtn", zoomInBtn);

    const inputs = c.values ? c.values : [{}];
    if (editing()) {
      if (viewer) viewer.destroy();
      form = new Form({ options: {}, domContainer, template, inputs });
    } else {
      if (form) form.destroy();
      viewer = new Viewer({ options: {}, domContainer, template, inputs });
    }
    if (zoomInBtn) {
      zoomInBtn.click();
      zoomInBtn.click();
      zoomInBtn.click();
    }
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

  return (
    <div class={CsEditStyle}>
      <div id="pdf-container" style={{ width: "100%", height: "100%" }}></div>
      <Flex style={{ "justify-content": "space-between" }}>
        <Flex>
          <Show when={!editing()}>
            <Button
              shape="icon"
              title="Edit charsheet"
              onClick={() => setEditing(true)}
            >
              <FaSolidPencil />
              <Texte size="small">Content</Texte>
            </Button>
          </Show>
          <Show when={editing()}>
            <Button shape="icon" title="Save charsheet" onClick={save}>
              <FaSolidFloppyDisk />
              <Texte size="small">Save</Texte>
            </Button>
          </Show>
          <Button size="small" onClick={editName}>
            <FaSolidPencil />
            <Texte size="small">Name</Texte>
          </Button>
          <Checkbox
            label="Session"
            title="Card in current session"
            color={themeVars.color.secondary}
            onChange={(v) => putIntoSession(v)}
            //TODO:   value={sessionCards().includes(item.id)}
          />
        </Flex>
        <Flex vcenter>
          <Texte size="bigger">{cs()?.name}</Texte>
          <Button
            onClick={deleteCharsheet}
            title="Delete charsheet"
            size="small"
          >
            <FaSolidTrash color={themeVars.color.secondary} />
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};
