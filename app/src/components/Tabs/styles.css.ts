import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const TabsRootStyle = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.size.standard,
  width: "100%",
  height: "100%",
});

export const TabsTriggerGroupStyle = style({
  fontFamily: themeVars.font.family,
  backgroundColor: themeVars.color.background,
});

export const TabsTriggerStyle = style({
  fontFamily: themeVars.font.family,
  backgroundColor: themeVars.color.backgroundSecondary,
  outline: "none",
  border: "none",
  padding: "5px 10px",
  color: themeVars.color.primary,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  fontSize: themeVars.font.size.standard,
  opacity: 0.8,
  selectors: {
    "&[data-selected]": {
      opacity: 1,
      borderBottom: `solid 1px ${themeVars.color.secondary}`,
    },
  },
});
