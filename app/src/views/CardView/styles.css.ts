import { sprinkles } from "./../../common/theme.css";
import { style } from "@vanilla-extract/css";

export const CardStyle = style([
  sprinkles({
    backgroundColor: "background",
    color: "primary",
    padding: "medium",
    display: "flex",
    flexDirection: "column",
  }),
  {
    position: "relative",
    flex: 1,
    minWidth: "100px",
    minHeight: "200px",
  },
]);


