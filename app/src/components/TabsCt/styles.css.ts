import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const TabsRootStyle = style({
  fontFamily: themeVars.font.family,
  width: "100%",
  height: "100%",
});

export const TabsTriggerGroupStyle = style({
  fontFamily: themeVars.font.family,
  backgroundColor: themeVars.color.background,
  marginBottom: 10,
});

export const TabsTriggerStyle = style({
  fontFamily: themeVars.font.family,
  backgroundColor: themeVars.color.background,
  outline: "none",
  border: "none",
  marginRight: 5,
  padding: "5px 10px",
  color: themeVars.color.primary,
  borderRadius: 5,
  textTransform: "uppercase",
  fontSize: themeVars.font.size.small,
  selectors: {
    "&[data-selected]": {
      color: themeVars.color.secondary,
      borderBottom: `solid 1px ${themeVars.color.secondary}`,
    },
  },
});
