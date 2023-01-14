import { ToggleButton as TB } from "@kobalte/core";
import { FaSolid0, FaSolid2 } from "solid-icons/fa";
import { Component, Show } from "solid-js";
import { currentStyle } from "~/common";
import { ToggleButtonStyle } from "./styels.css";

type Props = {
  pressed: any;
  released: any;
  onPressedChange?: (isPressed: boolean) => void;
};

export const ToggleButton: Component<Props> = ({
  pressed,
  released,
  onPressedChange,
}) => {
  return (
    <TB.Root
      class={ToggleButtonStyle}
      style={currentStyle()}
      onPressedChange={onPressedChange}
    >
      {(state) => (
        <Show when={state.isPressed()} fallback={released}>
          {pressed}
        </Show>
      )}
    </TB.Root>
  );
};
