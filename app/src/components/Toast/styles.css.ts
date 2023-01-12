import { themeVars } from "./../../common/theme.css";
import { style } from "@vanilla-extract/css";

export const ToastStyle = style({
  backgroundColor: themeVars.color.accent,
  border: `1px solid ${themeVars.color.backgroundSecondary}`,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.size.standard,
  color: themeVars.color.primary,
  padding: "10px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
});
