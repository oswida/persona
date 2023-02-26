import { Option } from "@zag-js/select/dist/select.types";
import {
  FaSolidDeleteLeft,
  FaSolidEye,
  FaSolidEyeSlash,
  FaSolidPlus,
} from "solid-icons/fa";
import { createMemo, createSignal, Match, Show, Switch } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import {
  charsheetData,
  CharsheetData,
  csTemplateList,
  personaCharsheetKey,
  saveGenericData,
  setCharsheetData,
  settingsData,
} from "~/common";
import {
  Accordion,
  AccordionDesc,
  Button,
  Checkbox,
  Flex,
  Input,
  Select,
  Texte,
} from "~/components";
import { CharsheetEditor } from "./CharsheetEditor";
import { CharsheetItem } from "./CharsheetItem";
import { CsEditStyle, CsListStyle, CsZoneStyle } from "./styles.css";

export const CharsheetView = () => {
  const [filter, setFilter] = createSignal("");
  const [tpl, setTpl] = createSignal("");
  const [onlySession, setOnlySession] = createSignal(false);
  const [onlyOwner, setOnlyOwner] = createSignal(false);
  const [editorVisible, setEditorVisible] = createSignal(false);
  const [cs, setCs] = createSignal<CharsheetData | null>();

  let refFlt: HTMLInputElement;

  const items = createMemo(() => {
    return Object.values(charsheetData()).map((it) => {
      const tpl = csTemplateList()[it.templateId];
      return {
        title: it.name,
        value: it.id,
        content: <CharsheetItem item={it} />,
      } as AccordionDesc;
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

  const create = () => {
    const t = tpl();
    if (!t) return;
    const value: CharsheetData = {
      id: uuidv4(),
      owner: settingsData().ident.browserID,
      name: "Character",
      playerId: settingsData().ident.browserID,
      templateId: t,
      playerName: settingsData().ident.username,
      values: {},
    };
    const newState = { ...charsheetData() };
    newState[value.id] = value;
    setCharsheetData(newState);
    saveGenericData(personaCharsheetKey, newState);
  };

  const templates = createMemo(() => {
    const lst = csTemplateList();
    return Object.values(csTemplateList()).map((it) => {
      return { label: it.name, value: it.id } as Option;
    });
  });

  const selTpl = (o: Option | null) => {
    if (!o) return;
    setTpl(o.value);
  };

  const selCharsheet = (details: { value: string | string[] | null }) => {
    if (!details) return;
    const v = details.value as string;
    if (!v) return;
    const c = charsheetData()[v];
    if (!c) return;
    setCs(c);
  };

  return (
    <Flex>
      <div class={CsListStyle}>
        <Flex
          style={{
            "align-items": "center",
            "justify-content": "space-between",
          }}
        >
          <Texte>Charsheets</Texte>
          <Flex>
            <Select label="Template" options={templates} onChange={selTpl} />
            <Button onClick={create}>
              <FaSolidPlus />
            </Button>
          </Flex>
        </Flex>
        <Flex>
          <Checkbox
            label="Only current session"
            value={onlySession()}
            onChange={(v) => setOnlySession(v)}
          />
          <Checkbox
            label="Only owned"
            value={onlyOwner()}
            onChange={(v) => setOnlyOwner(v)}
          />
          <Button
            style={{ "margin-left": "20px" }}
            onClick={() => setEditorVisible(!editorVisible())}
          >
            <Switch>
              <Match when={!editorVisible()}>
                <FaSolidEye />
              </Match>
              <Match when={editorVisible()}>
                <FaSolidEyeSlash />
              </Match>
            </Switch>
          </Button>
        </Flex>
        <div class={CsZoneStyle}>
          <Accordion items={items} onChange={selCharsheet} />
        </div>
        <Flex>
          <Texte>Filter: </Texte>
          <Input
            underline
            transparent
            fontSize="small"
            ref={(e) => (refFlt = e)}
            onInput={flt}
          />
          <Button onClick={clear}>
            <FaSolidDeleteLeft />
          </Button>
        </Flex>
      </div>

      {/* Editor */}
      <Show when={editorVisible()}>
        <CharsheetEditor cs={cs} />
      </Show>
    </Flex>
  );
};
