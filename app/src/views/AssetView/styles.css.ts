import { style } from "@vanilla-extract/css";
import { sprinkles, themeVars } from "~/common";


export const assetRootStyle = style([sprinkles({
    display: "flex",
    flexDirection: "column",
    padding: "medium",
    backgroundColor: "backgroundSecondary",
    gap: "medium"
}), {
    height: "calc(100vh - 10px)",
    width: "30vw",
}])

export const assetCtrlRowStyle = style([sprinkles({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "medium"
})])

export const assetListStyle = style([sprinkles({
    backgroundColor: "backgroundSecondary",
    padding: "small",
}), {
    border: `1px solid ${themeVars.color.secondary}`,
    borderRadius: "5px",
    overflowY: "auto",
    flex: 1
}]);

export const assetItemStyle = style([sprinkles({
    backgroundColor: "background",
    color: "primary",
    padding: "medium",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
}), {
    minWidth: "100px"
}]);