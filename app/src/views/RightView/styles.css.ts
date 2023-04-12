import { style } from "@vanilla-extract/css";
import { sprinkles, themeVars } from "~/common";


export const rightViewRootStyle = style([sprinkles({
    display: "flex",
    flexDirection: "row",
    gap: "small",
    padding: "small"
})])

export const rightViewIconsStyle = style([sprinkles({
    backgroundColor: "none",
    gap: "medium",
    display: "flex",
    flexDirection: "column",
    marginY: "medium"
})])