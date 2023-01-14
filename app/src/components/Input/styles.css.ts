import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "~/common/theme.css";

export const InputStyle = recipe({
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
        borderBottom: `solid 1px ${themeVars.color.primary}`,
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

export const InputButtonStyle = recipe({
  base: {
    appearance: "textfield",
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.size.bigger,
    color: themeVars.color.primary,
    outline: "none",
    border: `solid 1px ${themeVars.color.secondary}`,
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "transparent",
    selectors: {
      "&:hover": {
        color: themeVars.color.primary,
        textDecoration: "none",
        cursor: "pointer",
      },
    },
  },
  variants: {
    size: {
      standard: {
        padding: 5,
        paddingLeft: 7,
        paddingRight: 7,
      },
      small: {
        padding: 2,
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: themeVars.font.size.small,
      },
    },
  },
  defaultVariants: {
    size: "standard",
  },
});
