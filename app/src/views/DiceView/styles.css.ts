import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";

export const DiceViewRootStyle = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.size.standard,
  padding: "2px 5px",
  height: "calc(100vh - 70px)",
  borderRadius: 5,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 10,
  width: 260,
});

export const RollInfoStyle = style({
  border: `solid 1px ${themeVars.color.secondary}`,
  marginTop: 10,
  padding: 10,
  borderRadius: 5,
  width: "90%",
  position: "relative",
});

export const RollHistoryStyle = style({
  border: `1px solid ${themeVars.color.secondary}`,
  borderRadius: 5,
  padding: 5,
  height: 200,
  width: "calc(100% - 10px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 2,
  flex: 1,
  overflow: "auto",
});
