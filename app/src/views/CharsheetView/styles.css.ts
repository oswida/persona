import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const CsStyle = style({
  backgroundColor: themeVars.color.backgroundSecondary,
  color: themeVars.color.primary,
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: "100px",
  minHeight: "200px",
});

export const CsListStyle = style({
  height: "calc(100vh - 2em - 10px)",
  width: "30vw",
  flex: 1,
  backgroundColor: themeVars.color.accent,
  display: "flex",
  flexDirection: "column",
  padding: "5px",
  gap: "10px",
});

export const CsZoneStyle = style({
  flex: 1,
  backgroundColor: themeVars.color.backgroundSecondary,
  padding: "5px",
  border: `1px solid ${themeVars.color.secondary}`,
  borderRadius: "5px",
  overflowY: "auto",
});
