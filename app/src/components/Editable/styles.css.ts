import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "~/common";

export const EditableFlex = style({
  display: "flex",
  gap: "10px",
});

export const EditableStyle = recipe({
  base: {
    boxShadow: "none",
    outline: "none",
    border: "none",
    padding: "4px 8px",
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.size.bigger,
    appearance: "textfield",
    backgroundColor: themeVars.color.background,
    color: themeVars.color.primary,
    borderRadius: 5,
  },
  variants: {
    transparent: {
      true: {
        backgroundColor: "transparent",
      },
    },
    underline: {
      true: {
        borderBottom: `solid 1px ${themeVars.color.secondary}`,
      },
    },
    isTitle: {
      true: {
        fontWeight: "bold",
        fontSize: themeVars.font.size.large,
      },
    },
    center: {
      true: {
        textAlign: "center",
      },
    },
    size: {
      small: {
        fontSize: themeVars.font.size.small,
      },
      smaller: {
        fontSize: themeVars.font.size.smaller,
      },
      standard: {
        fontSize: themeVars.font.size.standard,
      },
    },
  },
});
