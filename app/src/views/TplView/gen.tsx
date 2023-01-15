import { generateSerialKeys } from "~/common";
import {
  TplColumn,
  TplElement,
  TplElementType,
  TplPage,
  TplRow,
  TplSection,
} from "~/templates/types";
import { SizeSwitchButton } from "../WhiteboardView/Tools";

export const genElement = (
  etype: TplElementType,
  content: any,
  tip?: string
) => {
  return {
    id: generateSerialKeys(10, "-"),
    content: content,
    etype: etype,
    tip: tip,
  } as TplElement;
};

export const genPage = (title: string, sections: TplSection[] = []) => {
  return {
    id: generateSerialKeys(10, "-"),
    sections: sections,
    title: title,
  } as TplPage;
};

export const genSection = (title?: string, rows: TplRow[] = []) => {
  return {
    id: generateSerialKeys(10, "-"),
    title: title,
    rows: rows,
  } as TplSection;
};

export const genRow = (columns: TplColumn[] = []) => {
  return {
    id: generateSerialKeys(10, "-"),
    columns: columns,
  } as TplRow;
};

export const genColumn = (size: string, elements: TplElement[] = []) => {
  return {
    id: generateSerialKeys(10, "-"),
    size: size,
    elements: elements,
  } as TplColumn;
};
