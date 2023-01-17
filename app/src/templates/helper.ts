import { setCsTemplateList } from "~/common";
import { TemplateOne } from "./defs/one";
import { TemplateTwo } from "./defs/two";
import { Tpl } from "./types";

export const initTemplateList = () => {
  const newState: Record<string, Tpl> = {};
  newState[TemplateOne.id] = TemplateOne;
  newState[TemplateTwo.id] = TemplateTwo;
  setCsTemplateList(newState);
};
