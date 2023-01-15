export type TplElementType =
  | "header"
  | "help"
  | "text"
  | "numeric"
  | "numeric_with_max"
  | "resource";

export type TplResource = {
  value: number;
  max: number;
  decoration: "circle" | "square" | "star";
  color?: string;
  canChange: boolean;
};

export type TplNumericWithMax = {
  value: number;
  max: number;
  decoration: "circle" | "square" | "underline" | "none";
};

export type TplNumeric = {
  value: number;
  decoration: "circle" | "square" | "underline" | "none";
};

export type TplElement = {
  id: string;
  etype: TplElementType;
  content: string | TplNumeric | TplNumericWithMax;
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
