import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const CheckboxRootStyle = style({
  backgroundColor: "transparent",
  color: themeVars.color.primary,
  display: "flex",
  gap: "5px",
  alignItems: "center",
  justifyContent: "center",
});

export const CheckboxControlStyle = recipe({
  base: {
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.5rem",
    height: "1.5rem",
    fontSize: themeVars.font.size.large,
    selectors: {
      "&::after": {
        backgroundColor: "transparent",
        content: "☐",
      },
    },
  },
  variants: {
    checked: {
      true: {
        selectors: {
          "&::after": {
            backgroundColor: "transparent",
            content: "🗵",
          },
        },
      },
    },
  },
});
