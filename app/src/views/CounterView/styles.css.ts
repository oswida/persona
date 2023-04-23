import { style } from "@vanilla-extract/css";
import { sprinkles, themeVars } from "~/common";

export const counterRootStyle = style([sprinkles({
    display: "flex",
    flexDirection: "column",
    padding: "medium",
    backgroundColor: "backgroundSecondary",
    gap: "medium"
}), {
    height: "calc(100vh - 10px)",
    width: "30vw",
}])

export const counterCtrlRowStyle = style([sprinkles({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "medium"
})])

export const counterListStyle = style([sprinkles({
    backgroundColor: "backgroundSecondary",
    padding: "small",
}), {
    border: `1px solid ${themeVars.color.secondary}`,
    borderRadius: "5px",
    overflowY: "auto",
    flex: 1
}]);

export const counterItemStyle = style([sprinkles({
    backgroundColor: "background",
    color: "primary",
    padding: "medium",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
}), {
    minWidth: "100px"
}]);