import { JSONEditor } from "@json-editor/json-editor";
import { Component, createEffect } from "solid-js";
import { buttonPress } from "./callbacks";
import { CharEditorRoot } from "./styles.css";

const options = {
  theme: "barebones",
  no_additional_properties: true,
  disable_properties: false,
  disable_edit_json: true,
  show_errors: false,
};

type Props = {
  schema: any;
  data: any;
};

export const CharEditor: Component<Props> = ({ schema, data }) => {
  let holder: HTMLDivElement;
  let editor: any;
  let bkgImage = schema.options["data-bkg"];
  let bkgTop = schema.options["data-bkg-top"];
  let bkgWidth = schema.options["data-bkg-width"];
  let bkgHeight = schema.options["data-bkg-height"];
  let bkgPadding = schema.options["data-bkg-padding"];

  JSONEditor.defaults.callbacks = {
    button: {
      roll: buttonPress,
    },
  };

  createEffect(() => {
    if (!holder) return;
    editor = new JSONEditor(holder, {
      ...options,
      schema: schema,
      startval: data,
    });
  });

  return (
    <div
      style={{
        "background-image": bkgImage ? `url("csimg/${bkgImage}")` : undefined,
        "background-repeat": "no-repeat",
        padding: bkgPadding ? `${bkgPadding}` : undefined,
        "padding-top": bkgTop ? `${bkgTop}` : undefined,
      }}
    >
      <div
        class={CharEditorRoot}
        id="EditorHolder"
        ref={(e) => (holder = e)}
        style={{
          width: bkgWidth ? `${bkgWidth}` : undefined,
          height: bkgHeight ? `${bkgHeight}` : undefined,
        }}
      />
    </div>
  );
};
