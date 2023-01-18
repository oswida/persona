export type TplElementType =
  | "header"
  | "help"
  | "text"
  | "numeric"
  | "numeric_with_max"
  | "resource"
  | "table"
  | "image";

export type TplImg = {
  label?: string;
  url: string;
  width?: string;
  height?: string;
};

export type TplTable = {
  label?: string;
  headers?: string[];
  colCount: number;
  rowCount: number;
  inputSize: number;
  rowLabels?: string[];
  help?: string;
};

export type TplResource = {
  label?: string;
  count: number;
  decoration: "circle" | "square" | "star";
  color?: string;
  adjustable?: boolean;
  descriptions?: boolean;
  help?: string;
};

export type TplNumericWithMax = {
  label?: string;
  help?: string;
  max: number;
  decoration: "circle" | "square" | "underline" | "none";
};

export type TplNumeric = {
  label?: string;
  help?: string;
  decoration: "circle" | "square" | "underline" | "none";
};

export type TplText = {
  value: string;
  marked: boolean;
};

export type TplElement = {
  id: string;
  etype: TplElementType;
  content:
    | string
    | TplText
    | TplNumeric
    | TplNumericWithMax
    | TplResource
    | TplTable
    | TplImg;
  tip?: string;
};

export type TplColumn = {
  id: string;
  size: string;
  elements: TplElement[];
};

export type TplRow = {
  id: string;
  columns: TplColumn[];
};

export type TplSection = {
  id: string;
  title?: string;
  rows: TplRow[];
};

export type TplPage = {
  id: string;
  title: string;
  sections: TplSection[];
};

export type Tpl = {
  id: string;
  name: string;
  game: string;
  pages: TplPage[];
};