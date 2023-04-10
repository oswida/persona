import { style } from "@vanilla-extract/css";
import { sprinkles } from "~/common";

export const sessionSettingRootStyle = style([sprinkles({
    display: "flex",
    flexDirection: "column",
    padding: "medium",
    gap: "medium",
    backgroundColor: "backgroundSecondary",

})])

export const sessionSettingRowStyle = style([sprinkles({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
})])