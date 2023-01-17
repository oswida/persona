import {
  TplColumn,
  TplElement,
  TplElementType,
  TplPage,
  TplRow,
  TplSection,
} from "~/templates/types";
import { v4 as uuidv4 } from "uuid";

export const genElement = (
  etype: TplElementType,
  content: any,
  tip?: string
) => {
  return {
    id: uuidv4(),
    content: content,
    etype: etype,
    tip: tip,
  } as TplElement;
};

export const genPage = (title: string, sections: TplSection[] = []) => {
  return {
    id: uuidv4(),
    sections: sections,
    title: title,
  } as TplPage;
};

export const genSection = (title?: string, rows: TplRow[] = []) => {
  return {
    id: uuidv4(),
    title: title,
    rows: rows,
  } as TplSection;
};

export const genRow = (columns: TplColumn[] = []) => {
  return {
    id: uuidv4(),
    columns: columns,
  } as TplRow;
};

export const genColumn = (size: string, elements: TplElement[] = []) => {
  return {
    id: uuidv4(),
    size: size,
    elements: elements,
  } as TplColumn;
};
