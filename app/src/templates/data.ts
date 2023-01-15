import {
  Tpl,
  TplColumn,
  TplElement,
  TplPage,
  TplRow,
  TplSection,
} from "./types";

export const SampleTpl = {
  pages: [
    {
      id: "1",
      title: "Page 1",
      sections: [
        {
          showTitle: true,
          title: "Section One",
          rows: [
            {
              columns: [
                {
                  size: "100px",
                  elements: [
                    {
                      id: "1",
                      etype: "text",
                      content: "asas aSA SA sAS As AS AsAS ",
                    } as TplElement,
                    {
                      id: "2",
                      etype: "help",
                      content: "Help help help ",
                    } as TplElement,
                    {
                      id: "3",
                      etype: "header",
                      content: "HEADER",
                    } as TplElement,
                  ],
                } as TplColumn,
              ],
            } as TplRow,
          ],
        } as TplSection,
      ],
    } as TplPage,
    {
      id: "2",
      title: "Page 2",
    },
    {
      id: "3",
      title: "Page 3",
    },
  ],
} as Tpl;
