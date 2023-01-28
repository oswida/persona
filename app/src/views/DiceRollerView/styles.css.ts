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
  width: "3rem",
  height: "3rem",
  color: themeVars.color.primary,
  userSelect: "none",
  textDecoration: "none",
  borderRadius: "50%",
  border: `solid 1px ${themeVars.color.accent}`,
  selectors: {
    "&:hover": {
      backgroundColor: themeVars.color.accent,
    },
    "&::before": {
      content: "",
      position: "absolute",
      top: "0px",
      left: "0px",
      background: "url(img/cubes.svg)",
    },
  },
  zIndex: 10,
  fontSize: "0.9rem",
});

export const DiceSelectorControl = style({
  width: "1.3rem",
  height: "1.3rem",
  border: `1px solid ${themeVars.color.accent}`,
  borderRadius: "50%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  backgroundColor: themeVars.color.secondary,
  color: themeVars.color.backgroundSecondary,
  fontWeight: "bold",
  left: "50%",
  transform: "translate(-50%, 50%)",
  bottom: 0,
  fontSize: themeVars.font.size.standard,
  justifyContent: "center",
});

export const DiceSelectorBackground = style({
  opacity: 0.1,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
