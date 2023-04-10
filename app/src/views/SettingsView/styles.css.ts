import { style } from "@vanilla-extract/css";
import { sprinkles } from "~/common";

export const settingRootStyle = style([sprinkles({
  display: "flex",
  flexDirection: "column",
  gap: "medium",
  padding: "medium",
  backgroundColor: "backgroundSecondary"
}), { width: "320px" }]);

export const settingFieldStyle = style([sprinkles({
  display: "flex",
  flexDirection: "column",
  padding: "small",
  gap: "medium"
})]);

export const SettingFieldStyle = style({
  display: "flex",
  alignItems: "center",
  padding: "5px",
  gap: "10px",
  marginTop: "5px",
  justifyContent: "space-between",
  flex: 1,
  width: "100%",
});
