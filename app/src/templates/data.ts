import { TplImg, TplResource, TplTable, TplText } from "~/templates/types";
import {
  genColumn,
  genElement,
  genPage,
  genRow,
  genSection,
} from "./../views/TplView/gen";
import { Tpl, TplNumeric, TplNumericWithMax } from "./types";

export const SampleTpl = {
  id: "t1",
  name: "sample template",
  game: "",
  pages: [
    genPage("Page 1", [
      genSection("section 1", [
        genRow([
          genColumn("50%", [
            genElement("text", {
              value: "First text",
              marked: true,
            } as TplText),
          ]),
          genColumn("50%", [
            genElement("text", { value: "Text in second column" } as TplText),
            genElement(
              "numeric_with_max",
              {
                decoration: "square",
                value: 5,
                max: 10,
                label: "STR",
                help: "This is strength of a body",
              } as TplNumericWithMax,
              "Enter value"
            ),
          ]),
        ]),
        genRow([
          genColumn("33%", [
            genElement("numeric", {
              label: "Some numeric",
              decoration: "circle",
              value: 0,
              help: "This is a help for numeric",
            } as TplNumeric),
            genElement("numeric", {
              decoration: "square",
              value: 5,
            } as TplNumeric),
          ]),
          genColumn("66%", [
            genElement("text", {
              value: "Text in second column for second row",
            } as TplText),
            genElement("help", "Help for this"),
            genElement("resource", {
              label: "Some resource",
              count: 7,
              decoration: "circle",
              adjustable: true,
              color: "#f00",
              descriptions: false,
              help: "resource help",
            } as TplResource),
          ]),
        ]),
      ]),
      genSection("section 2", [
        genRow([
          genColumn("50%", [
            genElement("table", {
              label: "table",
              headers: [
                "WS",
                "BS",
                "S",
                "T",
                "I",
                "Ag",
                "Dex",
                "Int",
                "WP",
                "Fel",
              ],
              rowCount: 3,
              colCount: 10,
              inputSize: 2,
              rowLabels: ["A", "B", "C"],
            } as TplTable),
            genElement("image", {
              url: "https://www.history.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc5MDg1ODk2NTA4NzQ1/vase-with-a-cultic-scene-with-musicians.jpg",
              width: "150px",
            } as TplImg),
          ]),
        ]),
      ]),
      genSection("section 3", [
        genRow([
          genColumn("33%", [
            genElement("text", {
              value: "Text in second column for second row",
            } as TplText),
            genElement("table", {
              label: "table",
              headers: ["raz", "dwa", "trzy"],
              rowCount: 3,
            } as TplTable),
          ]),
        ]),
      ]),
    ]),
    genPage("Page 2"),
  ],
} as Tpl;
