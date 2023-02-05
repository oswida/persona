import { style } from "@vanilla-extract/css";
import { baseStyle, sprinkles, themeVars } from "./../../common/theme.css";

export const PopoverRootStyle = style([
  baseStyle,
  sprinkles({
    borderRadius: "small",
  }),
  {
    border: `solid 1px ${themeVars.color.accent}`,
  },
]);

export const PopoverTitleStyle = style([
  sprinkles({
    display: "flex",
    padding: "small",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "standard",
    marginY: "small",
    color: "primary",
  }),
  {
    width: "100%",
  },
]);

export const PopoverCloseButtonStyle = style([
  sprinkles({
    backgroundColor: "none",
    color: "primary",
    display: "flex",
    justifyContent: "center",
  }),
  {
    border: "none",
    outline: "none",
    height: 30 * 0.8,
    width: 30,
    fontSize: 20,
    cursor: "pointer",
    alignItems: "center",
    userSelect: "none",
    alignSelf: "flex-end",
  },
]);

export const PopoverContentStyle = sprinkles({
  backgroundColor: "backgroundSecondary",
  padding: "small",
  borderRadius: "small",
});
