import { sprinkles } from "./../../common/theme.css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const CheckboxRootStyle = style([
  sprinkles({
    backgroundColor: "none",
    color: "primary",
    display: "flex",
    gap: "small",
    placeItems: "center",
  }),
]);

export const CheckboxControlStyle = recipe({
  base: [
    sprinkles({
      backgroundColor: "none",
      display: "flex",
      placeItems: "center",
      fontSize: "big",
    }),
    {
      width: "1.5rem",
      height: "1.5rem",
      selectors: {
        "&::after": {
          backgroundColor: "transparent",
          content: "☐",
          fontWeight: "bold",
        },
      },
    },
  ],
  variants: {
    checked: {
      true: {
        selectors: {
          "&::after": {
            backgroundColor: "transparent",
            content: "🗵",
            fontWeight: "bold",
          },
        },
      },
    },
  },
});
