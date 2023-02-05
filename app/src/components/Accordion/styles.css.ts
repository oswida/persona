import { sprinkles } from "./../../common/theme.css";
import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

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

export const AccordionTitleStyle = style([
  sprinkles({
    paddingX: "medium",
    paddingY: "small",
  }),
  {
    flex: 1,
  },
]);

export const AccordionItemStyle = style({
  flex: 1,
  width: "100%",
});
