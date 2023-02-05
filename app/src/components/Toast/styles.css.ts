import { sprinkles, themeVars } from "./../../common/theme.css";
import { style } from "@vanilla-extract/css";

export const ToastStyle = style([
  sprinkles({
    backgroundColor: "backgroundSecondary",
    fontSize: "standard",
    color: "primary",
    padding: "medium",
    borderRadius: "small",
    display: "flex",
    justifyContent: "center",
  }),
  {
    border: `1px solid ${themeVars.color.accent}`,
    fontFamily: themeVars.font.family,
  },
]);
