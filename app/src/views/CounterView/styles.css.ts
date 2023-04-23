import { style } from "@vanilla-extract/css";
import { sprinkles } from "~/common";

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