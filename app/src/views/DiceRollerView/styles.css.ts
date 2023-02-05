import { sprinkles } from "./../../common/theme.css";
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

export const DiceSelectorControl = style([
  sprinkles({
    display: "flex",
    placeItems: "center",
    backgroundColor: "secondary",
    color: "backgroundSecondary",
    fontSize: "standard",
    justifyContent: "center",
  }),
  {
    borderRadius: "50%",
    width: "1.3rem",
    height: "1.3rem",
    border: `1px solid ${themeVars.color.accent}`,
    position: "absolute",
    fontWeight: "bold",
    left: "50%",
    transform: "translate(-50%, 50%)",
    bottom: 0,
  },
]);

export const DiceSelectorBackground = style({
  opacity: 0.1,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
