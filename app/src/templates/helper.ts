import { setCsTemplateList } from "~/common";
import { TplWfrpPl } from "./defs/wfrp-pl";

import { Tpl } from "./types";

export const initTemplateList = () => {
  const newState: Record<string, Tpl> = {};
  newState[TplWfrpPl.id] = TplWfrpPl;
  setCsTemplateList(newState);
};
