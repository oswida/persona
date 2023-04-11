import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { createFontVariants } from "~/common";
import { sprinkles } from "./../../common/theme.css";

export const MainStyle = recipe({
  base: [
    sprinkles({
      fontSize: "standard",
      backgroundColor: "background",
      color: "primary",
    }),
    {
      width: "100vw",
      height: "100vh",
      overflow: "auto",
    },
  ],
  variants: {
    font: { ...createFontVariants() },
  },
});


export const MainContentStyle = style([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    padding: "small",
  }),
]);
