import { sprinkles } from "./../../common/theme.css";
import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";

export const ChatRootStyle = style({
  backgroundColor: themeVars.color.backgroundSecondary,
  width: "20vw",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  justifyContent: "center",
  padding: "5px",
  height: "calc(100vh - 2em - 10px)",
  alignSelf: "flex-end",
});

export const ChatListStyle = style([
  sprinkles({
    backgroundColor: "background",
    borderRadius: "small",
    padding: "small",
    fontSize: "smaller",
    display: "flex",
    flexDirection: "column",
    gap: "small",
  }),
  {
    flex: 1,
    overflowY: "auto",
  },
]);
