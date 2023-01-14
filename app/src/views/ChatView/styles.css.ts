import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const ChatRootStyle = style({
  backgroundColor: themeVars.color.accent,
  minWidth: "400px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  justifyContent: "center",
});

export const ChatListStyle = style({
  height: "60vh",
  overflowY: "auto",
  backgroundColor: themeVars.color.backgroundSecondary,
  borderRadius: "5px",
  padding: "5px",
  fontSize: themeVars.font.size.smaller,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});
