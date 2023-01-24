import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const CardListboxStyle = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  height: "45vh",
  minWidth: "300px",
  backgroundColor: themeVars.color.backgroundSecondary,
  overflowY: "auto",
  padding: "5px",
});

export const CardListboxItemStyle = recipe({
  base: {
    padding: "3px 5px",
    cursor: "pointer",
    selectors: {
      "&:hover": {
        background: themeVars.color.background,
      },
    },
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  variants: {
    selected: {
      true: {
        background: themeVars.color.accent,
      },
    },
  },
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
  minWidth: "100px",
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
