import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const DialogRootStyle = style({
  backgroundColor: themeVars.color.accent,
  color: themeVars.color.primary,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.size.standard,
  borderRadius: "5px",
  zIndex: 50,
});

export const DialogOverlayStyle = style({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  backgroundColor: themeVars.color.background,
  opacity: 0.4,
});

export const DialogContentStyle = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: themeVars.color.accent,
  padding: "10px",
  border: `1px solid ${themeVars.color.backgroundSecondary}`,
  borderRadius: "5px",
  color: themeVars.color.primary,
});

export const DialogCloseButtonStyle = style({
  border: "none",
  outline: "none",
  height: 30 * 0.8,
  width: 30,
  fontSize: 20,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  userSelect: "none",
  backgroundColor: "transparent",
  color: themeVars.color.primary,
  position: "absolute",
  right: "5px",
  top: "5px",
});
