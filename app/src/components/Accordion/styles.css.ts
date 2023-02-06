import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { createFontVariants } from "~/common";
import { sprinkles } from "./../../common/theme.css";

export const AccordionRootStyle = style([
  sprinkles({
    backgroundColor: "none",
    color: "primary",
    display: "flex",
    flexDirection: "column",
    gap: "small",
    alignItems: "center",
    justifyContent: "center",
  }),
  {
    flex: 1,
  },
]);

export const AccordionTitleStyle = recipe({
  base: [
    sprinkles({
      paddingX: "medium",
      paddingY: "small",
    }),
    {
      flex: 1,
    },
  ],
  variants: {
    font: { ...createFontVariants() },
  },
});

export const AccordionItemStyle = style({
  flex: 1,
  width: "100%",
});
