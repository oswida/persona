import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const AccordionRootStyle = style({
  backgroundColor: "transparent",
  color: themeVars.color.primary,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
});

export const AccordionTitleStyle = style({
  padding: "5px 10px",
  flex: 1,
});

export const AccordionItemStyle = style({
  flex: 1,
  width: "100%",
});
