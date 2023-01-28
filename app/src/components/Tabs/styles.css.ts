import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const TabsRootStyle = style({
  width: "100%",
  height: "100%",
});

export const TabsListStyle = style({
  marginBottom: "10px",
});

export const TabsTriggerGroupStyle = style({});

export const TabsTriggerStyle = style({
  backgroundColor: "transparent",
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.size.standard,
  outline: "none",
  border: "none",
  padding: "5px 10px",
  color: themeVars.color.primary,
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,

  opacity: 0.8,
  selectors: {
    "&[data-selected]": {
      opacity: 1,
      borderBottom: `solid 2px ${themeVars.color.secondary}`,
      color: themeVars.color.secondary,
    },
  },
});

export const TabsContentStyle = style({
  border: `1px solid ${themeVars.color.backgroundSecondary}`,
  padding: "5px",
});
