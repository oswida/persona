import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";
import { sprinkles } from "./../../common/theme.css";

export const DialogRootStyle = style([
  sprinkles({
    backgroundColor: "backgroundSecondary",
    color: "primary",
    fontSize: "standard",
    borderRadius: "small",
  }),
  {
    zIndex: 50,
    border: `solid 1px ${themeVars.color.accent}`,
  },
]);

export const DialogOverlayStyle = style([
  sprinkles({
    backgroundColor: "background",
  }),
  {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    opacity: 0.4,
  },
]);

export const DialogContentStyle = style([
  sprinkles({
    backgroundColor: "backgroundSecondary",
    color: "primary",
    borderRadius: "small",
  }),
  {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: `1px solid ${themeVars.color.accent}`,
    zIndex: 50,
  },
]);

export const DialogDescStyle = style([
  sprinkles({
    padding: "small",
  }),
  {
    maxHeight: "75vh",
    overflow: "auto",
  },
]);

export const DialogCloseButtonStyle = style([
  sprinkles({
    placeItems: "center",
    backgroundColor: "none",
    color: "backgroundSecondary",
    borderRadius: "small",
  }),
  {
    border: "none",
    outline: "none",
    height: 30 * 0.8,
    width: 30,
    fontSize: 20,
    cursor: "pointer",
    display: "flex",
    userSelect: "none",
    alignSelf: "center",
  },
]);

export const DialogHeaderStyle = style([
  sprinkles({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "medium",
    padding: "small",
    borderTopLeftRadius: "small",
    borderTopRightRadius: "small",
    marginLeft: "none",
    alignItems: "center",
    backgroundColor: "secondary",
    color: "backgroundSecondary",
  }),
  {
    flex: 1,
    userSelect: "none",
  },
]);
