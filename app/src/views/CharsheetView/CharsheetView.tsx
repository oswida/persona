import { Option } from "@zag-js/select/dist/select.types";
import { FaSolidDeleteLeft, FaSolidPlus } from "solid-icons/fa";
import { createMemo, createSignal, Show } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import {
  charsheetData,
  CharsheetData,
  csTemplateList,
  personaCharsheetKey,
  saveGenericData,
  setCharsheetData,
  setCsTemplateList,
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
import { TplView } from "../TplView";
import { CsListStyle, CsZoneStyle } from "./styles.css";

export const CharsheetView = () => {
  const [filter, setFilter] = createSignal("");
  const [tpl, setTpl] = createSignal("");
  const [onlySession, setOnlySession] = createSignal(false);
  const [onlyOwner, setOnlyOwner] = createSignal(false);

  let refFlt: HTMLInputElement;

  const items = createMemo(() => {
    return Object.values(charsheetData()).map((it) => {
      const tpl = csTemplateList()[it.templateId];
      return {
        title: it.name,
        value: it.id,
        content: <TplView tpl={csTemplateList()[it.templateId]} />,
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
      playerId: "",
      templateId: t,
      playerName: "",
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

  return (
    <div class={CsListStyle}>
      <Flex
        style={{ "align-items": "center", "justify-content": "space-between" }}
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
      </Flex>
      <div class={CsZoneStyle}>
        <Accordion items={items} />
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
  );
};
