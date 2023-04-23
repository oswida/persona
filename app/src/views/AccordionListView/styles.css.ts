import { style } from "@vanilla-extract/css";
import { sprinkles, themeVars } from "~/common";

export const listRootStyle = style([sprinkles({
    display: "flex",
    flexDirection: "column",
    padding: "medium",
    backgroundColor: "backgroundSecondary",
    gap: "medium"
}), {
    height: "calc(100vh - 10px)",
    width: "30vw",
}])

export const listCtrlRowStyle = style([sprinkles({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "medium"
})])

export const listStyle = style([sprinkles({
    backgroundColor: "backgroundSecondary",
    padding: "small",
}), {
    border: `1px solid ${themeVars.color.secondary}`,
    borderRadius: "5px",
    overflowY: "auto",
    flex: 1
}]);