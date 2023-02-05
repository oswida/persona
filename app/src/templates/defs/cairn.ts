import { TplNumericWithMax, TplText } from "~/templates/types";
import { genPage, genSection } from "../gen";
import { Tpl } from "../types";
import { genColumn, genElement, genRow } from "./../gen";

export const TemplateCairn = {
  game: "Cairn",
  name: "Cairn basic",
  logo: "https://pl.cairnrpg.com/img/logo.png",
  id: "27345076-7c38-4119-b7d8-828e30c2bfa5",
  pages: [
    genPage("Main", [
      genSection("", [
        genRow([
          genColumn("49%", [
            genElement(
              "text",
              {
                label: "Name",
              } as TplText,
              ""
            ),
          ]),
          genColumn("49%", [
            genElement(
              "text",
              {
                label: "Background",
              } as TplText,
              ""
            ),
          ]),
        ]),
      ]),
      genSection("Abilities", [
        genRow([
          genColumn("33%", [
            genElement(
              "numeric_with_max",
              {
                decoration: "circle",
                label: "STR",
                help: "This is strength of a body",
              } as TplNumericWithMax,
              "Strength"
            ),
          ]),
          genColumn("33%", [
            genElement(
              "numeric_with_max",
              {
                decoration: "circle",
                label: "DEX",
                help: "This is a dexterity",
              } as TplNumericWithMax,
              "Dexterity"
            ),
          ]),
          genColumn("33%", [
            genElement(
              "numeric_with_max",
              {
                decoration: "circle",
                label: "WIS",
                help: "This is wisdom",
              } as TplNumericWithMax,
              "Wisdom"
            ),
          ]),
        ]),
      ]),
    ]),
  ],
} as Tpl;
