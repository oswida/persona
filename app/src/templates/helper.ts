import { setCsTemplateList } from "~/common";
import { TplCairnPl } from "./defs/cairn-pl";
import { TplWfrpPl } from "./defs/wfrp-pl";

import { Tpl } from "./types";

export const initTemplateList = () => {
  const newState: Record<string, Tpl> = {};
  newState[TplWfrpPl.id] = TplWfrpPl;
  newState[TplCairnPl.id] = TplCairnPl;
  setCsTemplateList(newState);
};
