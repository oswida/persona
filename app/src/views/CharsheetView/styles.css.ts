import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";
import { sprinkles } from "./../../common/theme.css";

export const CsItemStyle = style([
  sprinkles({
    backgroundColor: "background",
    color: "primary",
    padding: "medium",
    display: "flex",
    flexDirection: "column",
    gap: "medium",
  }),
  {
    flex: 1,
    minWidth: "100px",
    minHeight: "100px",
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

export const CsEditStyle = style([
  sprinkles({
    backgroundColor: "backgroundSecondary",
    display: "flex",
    flexDirection: "column",
    padding: "small",
    gap: "medium",
  }),
  {
    height: "calc(100vh - 2em - 10px)",
    width: "50vw",
  },
]);
