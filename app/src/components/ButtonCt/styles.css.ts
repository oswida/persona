import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "~/common";

export const ButtonStyle = recipe({
  base: {
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.size.standard,
    color: themeVars.color.primary,
    paddingTop: "5px",
    paddingBottom: "5px",
    outline: "none",
    border: "none",
    borderRadius: 5,
    backgroundColor: "transparent",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    selectors: {
      "&:hover": {
        backgroundColor: themeVars.color.backgroundMid,
        textDecoration: "none",
        cursor: "pointer",
      },
    },
  },
  variants: {
    size: {
      standard: {
        fontSize: themeVars.font.size.standard,
      },
      small: {
        fontSize: themeVars.font.size.small,
      },
      big: {
        fontSize: themeVars.font.size.large,
      },
    },
    border: {
      standard: {
        border: `1px solid ${themeVars.color.primary}`,
      },
      underline: {
        borderBottom: `1px solid ${themeVars.color.primary}`,
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
      },
      none: {
        border: "none",
      },
    },
    selected: {
      true: {
        backgroundColor: themeVars.color.secondary,
        color: themeVars.color.background,
      },
    },
  },
  defaultVariants: {
    size: "standard",
    border: "standard",
  },
});
