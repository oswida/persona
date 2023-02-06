import { recipe } from "@vanilla-extract/recipes";
import { createFontVariants, themeVars } from "~/common";
import { sprinkles } from "./../../common/theme.css";

export const EditableFlex = sprinkles({
  display: "flex",
  gap: "medium",
});

export const EditableStyle = recipe({
  base: [
    sprinkles({
      fontSize: "bigger",
      backgroundColor: "background",
      color: "primary",
      borderRadius: "small",
    }),
    {
      boxShadow: "none",
      outline: "none",
      border: "none",
      padding: "4px 8px",

      appearance: "textfield",
    },
  ],
  variants: {
    transparent: {
      true: [sprinkles({ backgroundColor: "none" })],
    },
    underline: {
      true: {
        borderBottom: `solid 1px ${themeVars.color.secondary}`,
      },
    },
    isTitle: {
      true: [
        sprinkles({
          fontSize: "big",
        }),
        {
          fontWeight: "bold",
        },
      ],
    },
    center: {
      true: {
        textAlign: "center",
      },
    },
    size: {
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
      standard: [
        sprinkles({
          fontSize: "standard",
        }),
      ],
    },
    font: { ...createFontVariants() },
  },
});
