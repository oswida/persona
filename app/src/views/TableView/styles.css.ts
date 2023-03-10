import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";

export const TableStyle = style({
  flex: 1,
  width: "100%",
  minHeight: "calc(100vh - 2em - 10px)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
});

export const TableMovingStyle = style({
  minHeight: "250px",
  minWidth: "350px",
  border: `1px dotted red`,
});

export const TableOverlayStyle = style({
  top: "60px",
  zIndex: 0,
});

export const CardObjectStyle = style({
  border: `1px solid ${themeVars.color.backgroundSecondary}`,
  borderRadius: "5px",
  padding: "5px",
  width: "350px",
  height: "250px",
});
