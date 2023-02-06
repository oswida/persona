import { globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { createFontVariants, sprinkles, themeVars } from "./common";

globalStyle("html, body", {
  margin: 0,
  padding: 0,
});

globalStyle("*, *:before, *:after", {
  boxSizing: "border-box",
});

export const appStyle = recipe({
  base: [
    sprinkles({ backgroundColor: "background", color: "primary" }),
    {
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    },
  ],
  variants: {
    font: { ...createFontVariants() },
  },
});
