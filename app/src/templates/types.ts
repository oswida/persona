export type TplElement = {
  etype: "header" | "help" | "text";
  id: string;
  content: any;
};

export type TplColumn = {
  size: string;
  elements: TplElement[];
};

export type TplRow = {
  columns: TplColumn[];
};

export type TplSection = {
  title: string;
  showTitle: boolean;
  rows: TplRow[];
};

export type TplPage = {
  id: string;
  title: string;
  sections: TplSection[];
};

export type Tpl = {
  name: string;
  game: string;
  pages: TplPage[];
};
