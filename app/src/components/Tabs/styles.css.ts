import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";
import { baseStyle, sprinkles } from "./../../common/theme.css";

export const TabsRootStyle = style({
  width: "100%",
  height: "100%",
});

export const TabsListStyle = sprinkles({ marginBottom: "medium" });

export const TabsTriggerGroupStyle = sprinkles({ marginBottom: "medium" });

export const TabsTriggerStyle = style([
  baseStyle,
  sprinkles({
    backgroundColor: "none",
    fontSize: "standard",
    paddingY: "small",
    paddingX: "medium",
    color: "primary",
  }),
  {
    outline: "none",
    border: `solid 1px ${themeVars.color.secondary}`,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    opacity: 0.8,
    selectors: {
      "&[data-selected]": {
        opacity: 1,
        border: `solid 1px ${themeVars.color.secondary}`,
        borderBottom: `solid 2px ${themeVars.color.secondary}`,
        color: themeVars.color.secondary,
      },
    },
  },
]);

export const TabsContentStyle = style([
  sprinkles({
    padding: "small",
  }),
  {
    border: `1px solid ${themeVars.color.backgroundSecondary}`,
  },
]);
