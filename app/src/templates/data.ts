import {
  genColumn,
  genElement,
  genPage,
  genRow,
  genSection,
} from "./../views/TplView/gen";
import {
  Tpl,
  TplColumn,
  TplElement,
  TplNumeric,
  TplNumericWithMax,
  TplPage,
  TplRow,
  TplSection,
} from "./types";

export const SampleTpl = {
  id: "t1",
  name: "sample template",
  game: "",
  pages: [
    genPage("Page 1", [
      genSection("section 1", [
        genRow([
          genColumn("50%", [genElement("text", "First text")]),
          genColumn("50%", [
            genElement("text", "Text in second column"),
            genElement(
              "numeric_with_max",
              {
                decoration: "square",
                value: 5,
                max: 10,
              } as TplNumericWithMax,
              "Enter value"
            ),
          ]),
        ]),
        genRow([
          genColumn("33%", [
            genElement("numeric", {
              decoration: "circle",
              value: 0,
            } as TplNumeric),
            genElement("numeric", {
              decoration: "square",
              value: 5,
            } as TplNumeric),
          ]),
          genColumn("66%", [
            genElement("text", "Text in second column for second row"),
            genElement("help", "Help for this"),
          ]),
        ]),
      ]),
      genSection("section 2"),
    ]),
    genPage("Page 2"),
  ],
} as Tpl;
