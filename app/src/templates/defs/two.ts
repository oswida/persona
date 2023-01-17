import { genPage, genSection } from "../gen";
import { Tpl } from "../types";

export const TemplateTwo = {
  game: "Game 2",
  name: "Template Two",
  id: "25518c44-9fb0-4e24-8d76-5e0b1d3d3b77",
  pages: [genPage("Page 2", [genSection("Section 2.2.1", [])])],
} as Tpl;
