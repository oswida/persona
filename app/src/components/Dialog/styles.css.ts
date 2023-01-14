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

  border: `1px solid ${themeVars.color.accent}`,
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
  backgroundColor: themeVars.color.backgroundSecondary,
  color: themeVars.color.primary,
  alignSelf: "center",
  borderRadius: "5px",
});

export const DialogHeaderStyle = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "10px",
  alignItems: "center",
  fontSize: `${themeVars.font.size.bigger} !important`,
});

export const DialogDescStyle = style({
  padding: "10px",
});
