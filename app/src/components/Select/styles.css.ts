import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";
import { baseStyle, sprinkles } from "./../../common/theme.css";

export const SelectRootStyle = style([
  baseStyle,
  sprinkles({
    backgroundColor: "none",
    color: "primary",
  }),
  {
    width: "max-content",
  },
]);

export const SelectContentStyle = style([
  sprinkles({
    backgroundColor: "accent",
    color: "primary",
    borderRadius: "small",
    paddingLeft: "none",
  }),
  {
    border: "none",
    outline: "none",
  },
]);

export const SelectLabelStyle = sprinkles({
  color: "primary",
  backgroundColor: "none",
});

export const SelectTriggerStyle = style([
  sprinkles({
    color: "primary",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "small",
    alignItems: "center",
    gap: "medium",
    fontSize: "standard",
  }),
  {
    padding: "2px 10px",
    border: "none",
    outline: "none",
    userSelect: "none",
  },
]);

export const SelectItemStyle = style([
  sprinkles({
    paddingY: "small",
    paddingX: "medium",
    display: "flex",
    gap: "medium",
    borderRadius: "small",
    justifyContent: "space-between",
  }),
  {
    border: "none",
    outline: "none",
    userSelect: "none",
    listStyle: "none",
    selectors: {
      "&:hover": {
        backgroundColor: themeVars.color.secondary,
        color: themeVars.color.backgroundSecondary,
      },
    },
  },
]);
