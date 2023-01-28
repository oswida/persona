import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";

export const DialogRootStyle = style({
  backgroundColor: themeVars.color.backgroundSecondary,
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
  padding: "5px",
  transform: "translate(-50%, -50%)",
  backgroundColor: themeVars.color.backgroundSecondary,
  border: `1px solid ${themeVars.color.accent}`,
  borderRadius: "5px",
  color: themeVars.color.primary,
  zIndex: 50,
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
  alignSelf: "center",
  borderRadius: "5px",
});

export const DialogHeaderStyle = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "5px",
  padding: "5px",
  borderRadius: "5px",
  marginLeft: 0,
  alignItems: "center",
  flex: 1,
  borderBottom: `2px solid ${themeVars.color.accent}`,
  userSelect: "none",
});
