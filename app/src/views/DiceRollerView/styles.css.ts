import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";

export const DiceSelectorStyle = style({
  position: "relative",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "5px",
  margin: "5px",
  width: "2rem",
  height: "2rem",
  border: `1px solid ${themeVars.color.backgroundSecondary}`,
  borderRadius: "50%",
  userSelect: "none",
  textDecoration: "none",
  selectors: {
    "&:hover": {
      backgroundColor: themeVars.color.backgroundSecondary,
    },
  },
  zIndex: 10,
  fontSize: "0.9rem",
});

export const DiceSelectorControl = style({
  width: "1.2rem",
  height: "1.2rem",
  border: `1px solid ${themeVars.color.accent}`,
  borderRadius: "50%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  backgroundColor: themeVars.color.backgroundSecondary,
  color: themeVars.color.primary,
  left: "50%",
  transform: "translate(-50%, 50%)",
  bottom: 0,
  fontSize: themeVars.font.size.small,
  justifyContent: "center",
});

export const DiceSelectorBackground = style({
  opacity: 0.1,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
