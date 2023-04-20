import { sprinkles } from "./../../common/theme.css";
import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const CardStyle = style([
  sprinkles({
    backgroundColor: "background",
    color: "primary",
    padding: "medium",
    display: "flex",
    flexDirection: "column",
  }),
  {
    position: "relative",
    flex: 1,
    minWidth: "100px",
    minHeight: "200px",
  },
]);

export const CardListStyle = style({
  height: "calc(100vh - 10px)",
  width: "30vw",
  backgroundColor: themeVars.color.backgroundSecondary,
  display: "flex",
  flexDirection: "column",
  padding: "5px",
  gap: "10px",
});

export const CardZoneStyle = style({
  flex: 1,
  backgroundColor: themeVars.color.backgroundSecondary,
  padding: "5px",
  border: `1px solid ${themeVars.color.secondary}`,
  borderRadius: "5px",
  overflowY: "auto",
});

