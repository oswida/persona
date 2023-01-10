import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const WhiteboardRootStyle = style({
  backgroundColor: themeVars.color.background,
  width: "100%",
  height: "100%",
});

export const WhiteboardToolsStyle = style({
  alignItems: "center",
  justifyContent: "space-between",
  gap: 20,
  backgroundColor: themeVars.color.background,
  padding: 6,
  borderBottom: `solid 1px ${themeVars.color.backgroundLight}`,
  display: "flex",
});
