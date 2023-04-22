import { sprinkles } from "./../../common/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const FlexStyle = recipe({
  base: [
    sprinkles({
      display: "flex",
    }),
  ],
  variants: {
    type: {
      row: sprinkles({ flexDirection: "row" }),
      column: sprinkles({ flexDirection: "column" }),
    },
    center: {
      true: sprinkles({ placeItems: "center" }),
    },
    vcenter: {
      true: sprinkles({ alignItems: "center" }),
    },
    scrolled: {
      true: {
        overflow: "auto",
      },
    },
    gap: {
      "small": sprinkles({ gap: "small" }),
      "medium": sprinkles({ gap: "medium" }),
      "large": sprinkles({ gap: "large" }),
      "em2": sprinkles({ gap: "em2" }),
    }
  },
  defaultVariants: {
    type: "row",
    center: false,
    vcenter: false,
    scrolled: false,
    gap: "small"
  },
});
