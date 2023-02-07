import { debounce } from "@solid-primitives/scheduled";
import { Component, ComponentProps } from "solid-js";
import { currentFont } from "~/common";
import { InputAreaStyle } from "./styles.css";

type Props = {
  small?: boolean;
  border?: "none" | "down" | "full";
  transparent?: boolean;
  fontSize?: "small" | "standard";
};

export const InputArea: Component<ComponentProps<"div"> & Props> = ({
  style,
  small,
  border,
  contentEditable,
  ref,
  children,
  onBlur,
  onInput,
  transparent,
  fontSize,
}) => {
  return (
    <div
      class={InputAreaStyle({
        fontSize: fontSize,
        border: border,
        transparent: transparent,
        font: currentFont(),
      })}
      style={style}
      contentEditable={contentEditable}
      ref={ref}
      onBlur={onBlur}
      onInput={onInput}
      spellcheck={false}
    >
      {children}
    </div>
  );
};
