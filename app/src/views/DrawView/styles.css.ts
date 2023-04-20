import { style } from "@vanilla-extract/css";
import { sprinkles } from "~/common";

export const DrawViewRootStyle = style([sprinkles({
    backgroundColor: "backgroundSecondary",
    display: "flex",
    flexDirection: "column",
    padding: "medium",
    gap: "medium",
}), {
    height: "calc(100vh - 20px)",
    width: "30vw",
}])