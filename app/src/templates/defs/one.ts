import { genPage, genSection } from "../gen";
import { Tpl } from "../types";

export const TemplateOne = {
  game: "Game 1",
  name: "Template One",
  id: "25518c44-9fb0-4e24-8d76-5e0b1d3d3b80",
  pages: [genPage("Page 1.1", [genSection("Section 1.1.1", [])])],
} as Tpl;
