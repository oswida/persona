import { sprinkles } from "./../../common/theme.css";
import { recipe } from "@vanilla-extract/recipes";

export const FlexStyle = recipe({
  base: [
    sprinkles({
      display: "flex",
      gap: "small",
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
  },
  defaultVariants: {
    type: "row",
    center: false,
    vcenter: false,
    scrolled: false,
  },
});
