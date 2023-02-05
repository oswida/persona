import { TemplateCairn } from "./defs/cairn";
import { setCsTemplateList } from "~/common";
import { TemplateOne } from "./defs/one";
import { TemplateTwo } from "./defs/two";
import { Tpl } from "./types";

export const initTemplateList = () => {
  const newState: Record<string, Tpl> = {};
  newState[TemplateCairn.id] = TemplateCairn;
  console.log(TemplateCairn);

  newState[TemplateTwo.id] = TemplateTwo;
  setCsTemplateList(newState);
};
