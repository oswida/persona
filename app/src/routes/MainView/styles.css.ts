import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";
import { baseStyle, sprinkles } from "./../../common/theme.css";

export const MainStyle = style([
  sprinkles({
    fontSize: "standard",
    backgroundColor: "background",
    color: "primary",
  }),
  {
    width: "100vw",
    height: "100vh",
    overflow: "auto",
    fontFamily: themeVars.font.family,
  },
]);

export const TopBarStyle = style([
  baseStyle,
  sprinkles({
    backgroundColor: "backgroundSecondary",
    color: "secondary",
    display: "flex",
    padding: "medium",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "2.5em",
  },
]);

export const MainContentStyle = style([
  sprinkles({
    marginTop: "em2",
    display: "flex",
    flexDirection: "column",
    padding: "small",
  }),
]);
