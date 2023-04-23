import { style } from "@vanilla-extract/css";
import { sprinkles, themeVars } from "~/common";

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