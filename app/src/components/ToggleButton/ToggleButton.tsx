import { ToggleButton as TB } from "@kobalte/core";
import { Component, Show } from "solid-js";
import { currentStyle } from "~/common";
import { ToggleButtonStyle } from "./styels.css";

type Props = {
  pressed: any;
  released: any;
};

export const ToggleButton: Component<Props> = ({ pressed, released }) => {
  return (
    <TB class={ToggleButtonStyle} style={currentStyle()}>
      {(state) => (
        <Show when={state.isPressed()} fallback={released}>
          {pressed}
        </Show>
      )}
    </TB>
  );
};
