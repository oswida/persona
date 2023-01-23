import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const CardListboxStyle = style({
  display: "flex",
  flex: 1,
  height: "45vh",
  minWidth: "300px",
  backgroundColor: themeVars.color.backgroundSecondary,
  overflowY: "auto",
});

export const CardStyle = style({
  backgroundColor: themeVars.color.backgroundSecondary,
  color: themeVars.color.primary,
  // border: `1px solid ${themeVars.color.secondary}`,
  // borderRadius: "5px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const CardSwiperStyle = style({
  backgroundColor: themeVars.color.backgroundSecondary,
  color: themeVars.color.primary,
  borderRadius: "5px",
  height: "50vh",
  width: "25vw",
  margin: "10px !important",
  padding: "10px",
});
