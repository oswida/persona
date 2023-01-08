import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "~/common";

export const CharEditorRoot = style({
  background: "transparent",
  color: themeVars.colors.fontPrimary,
  fontFamily: themeVars.fontFamily,
  fontSize: themeVars.fontSizes.standard,
  overflow: "auto",
});

globalStyle("#EditorHolder *", {
  background: themeVars.colors.background,
  color: themeVars.colors.fontPrimary,
  fontFamily: themeVars.fontFamily,
  fontSize: themeVars.fontSizes.standard,
});

globalStyle("#EditorHolder button", {
  border: `1px solid ${themeVars.colors.background100}`,
  borderRadius: "5px",
  padding: "5px",
  borderColor: themeVars.colors.background300,
});

globalStyle("#EditorHolder button:hover", {
  borderColor: themeVars.colors.fontPrimary,
});

globalStyle("#EditorHolder .json-editor-btn-collapse span", {
  display: "none",
});

globalStyle(`#EditorHolder .json-editor-btn-collapse:after`, {
  content: "⬍",
});

globalStyle("#EditorHolder .json-editor-btn-edit_properties span", {
  display: "none",
});

globalStyle(`#EditorHolder .json-editor-btn-edit_properties:after`, {
  content: "🛠",
});

globalStyle(`#EditorHolder .json-editor-btn-add`, {
  marginLeft: "5px",
});

globalStyle(`#EditorHolder .json-editor-btn-subtract`, {
  marginLeft: "5px",
});

globalStyle(
  `#EditorHolder .json-editor-btn-moveleft, .json-editor-btn-moveright`,
  {
    marginLeft: "5px",
  }
);

globalStyle(`#EditorHolder .json-editor-btn-delete`, {
  marginTop: "5px",
  marginLeft: "5px",
});

globalStyle("#EditorHolder .form-control", {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
});

globalStyle("#EditorHolder .row", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  gap: "10px",
});

globalStyle(".je-indented-panel", {
  borderLeft: `1px solid ${themeVars.colors.background300} !important`,
  backgroundColor: "transparent !important",
});

globalStyle(".je-indented-panel * ", {
  backgroundColor: "transparent !important",
});

globalStyle(".je-indented-panel > div > div", {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

globalStyle("#EditorHolder h3 label", {
  fontSize: themeVars.fontSizes.bigger,
});

globalStyle("#EditorHolder .je-tab--top", {
  backgroundColor: `${themeVars.colors.background} !important`,
});

globalStyle(`#EditorHolder input`, {
  border: `solid 1px ${themeVars.colors.background300}`,
  padding: "3px",
  paddingLeft: "5px",
  borderRadius: "5px",
  outline: "none",
});

globalStyle(`#EditorHolder input:focus`, {
  outline: `1px solid ${themeVars.colors.fontPrimary}`,
});

globalStyle(".je-checkbox", {
  accentColor: themeVars.colors.background200,
  minWidth: "1rem",
  minHeight: "1rem",
  alignSelf: "center",
});

globalStyle("#EditorHolder .form-control > label", {
  display: "flex",
  alignItems: "center",
});

globalStyle("#EditorHolder div[data-schematype='boolean']", {
  display: "flex",
  alignItems: "center",
});

globalStyle("#EditorHolder .form-control > select", {
  padding: "5px",
  borderRadius: "5px",
  border: `solid 1px ${themeVars.colors.background300}`,
  backgroundColor: `${themeVars.colors.background} !important`,
});

globalStyle("#EditorHolder div[data-schemaid='root']", {
  backgroundColor: "transparent",
});
