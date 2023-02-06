import { recipe } from "@vanilla-extract/recipes";
import { createFontVariants, themeVars } from "~/common";
import { baseStyle, sprinkles } from "./../../common/theme.css";

export const ButtonStyle = recipe({
  base: [
    baseStyle,
    sprinkles({
      paddingY: "small",
      borderRadius: "small",
      display: "flex",
      gap: "small",
      placeItems: "center",
    }),
    {
      outline: "none",
      border: "none",
      userSelect: "none",
      cursor: "pointer",
      textDecoration: "none",
      textAlign: "center",
      selectors: {
        "&:hover": { color: themeVars.color.secondary },
      },
    },
  ],
  variants: {
    size: {
      standard: [
        sprinkles({
          fontSize: "standard",
        }),
      ],
      small: [
        sprinkles({
          fontSize: "small",
        }),
      ],
      smaller: [
        sprinkles({
          fontSize: "smaller",
        }),
      ],
      big: [
        sprinkles({
          fontSize: "big",
        }),
      ],
      bigger: [
        sprinkles({
          fontSize: "bigger",
        }),
      ],
    },
    border: {
      standard: [
        {
          border: `1px solid ${themeVars.color.accent}`,
        },
      ],
      underline: {
        borderBottom: `1px solid ${themeVars.color.accent}`,
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
      },
      none: {
        border: "none",
      },
    },
    selected: {
      true: [
        sprinkles({
          backgroundColor: "secondary",
          color: "backgroundSecondary",
        }),
        {
          selectors: {
            "&:hover": { color: themeVars.color.accent },
          },
        },
      ],
      false: sprinkles({
        backgroundColor: "none",
        color: "primary",
      }),
    },
    shape: {
      icon: sprinkles({
        paddingX: "small",
      }),
      standard: sprinkles({
        paddingX: "medium",
      }),
    },
    font: { ...createFontVariants() },
  },
  defaultVariants: {
    size: "standard",
    border: "standard",
    shape: "standard",
    selected: false,
  },
});
