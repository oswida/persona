import { sprinkles } from "./../../common/theme.css";
import { style } from "@vanilla-extract/css";

export const TplPageStyle = style({
  width: "100%",
});

export const TpleHeaderStyle = sprinkles({
  fontSize: "bigger",
  color: "secondary",
});

export const TpleHelpStyle = style([
  sprinkles({
    fontSize: "small",
    color: "secondary",
  }),
  {
    alignSelf: "center",
  },
]);

export const TpleSectionStyle = sprinkles({
  fontSize: "bigger",
  backgroundColor: "background",
  color: "secondary",
  paddingX: "medium",
  paddingY: "small",
  borderRadius: "small",
});
