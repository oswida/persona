import { sprinkles, themeVars } from "./../../common/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { createFontVariants } from "~/common";

export const ToastStyle = recipe({
  base: [
    sprinkles({
      backgroundColor: "backgroundSecondary",
      fontSize: "standard",
      color: "primary",
      padding: "medium",
      borderRadius: "small",
      display: "flex",
      justifyContent: "center",
    }),
    {
      border: `1px solid ${themeVars.color.accent}`,
    },
  ],
  variants: {
    font: { ...createFontVariants() },
  },
});
