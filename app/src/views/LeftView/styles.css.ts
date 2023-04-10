import { style } from "@vanilla-extract/css";
import { sprinkles, themeVars } from "~/common";


export const leftViewRootStyle = style([sprinkles({
    display: "flex",
    flexDirection: "row",
    gap: "small"
})])

export const leftViewIconsStyle = style([sprinkles({
    backgroundColor: "none",
    gap: "medium",
    display: "flex",
    flexDirection: "column",
    marginY: "medium"
})])