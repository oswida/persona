import { sprinkles } from "./../../common/theme.css";
import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const CsStyle = style([
  sprinkles({
    backgroundColor: "background",
    color: "primary",
    padding: "medium",
    display: "flex",
    flexDirection: "column",
  }),
  {
    flex: 1,
    minWidth: "100px",
    minHeight: "200px",
  },
]);

export const CsListStyle = style([
  sprinkles({
    backgroundColor: "backgroundSecondary",
    display: "flex",
    flexDirection: "column",
    padding: "small",
    gap: "medium",
  }),
  {
    height: "calc(100vh - 2em - 10px)",
    width: "30vw",
    flex: 1,
  },
]);

export const CsZoneStyle = style([
  sprinkles({
    backgroundColor: "backgroundSecondary",
    padding: "small",
    borderRadius: "small",
  }),
  {
    flex: 1,
    border: `1px solid ${themeVars.color.secondary}`,
    overflowY: "auto",
  },
]);
