import * as pressable from "@zag-js/pressable";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  Accessor,
  Component,
  ComponentProps,
  createMemo,
  createUniqueId,
  JSX,
} from "solid-js";
import { currentFont } from "~/common";
import { ButtonStyle } from "./styles.css";

type Props = {
  onClick?: () => void;
  size?: "standard" | "small" | "big";
  border?: "standard" | "underline" | "none";
  selected?: Accessor<boolean>;
  minWidth?: string;
  shape?: "icon" | "standard";
};

export const Button: Component<Props & ComponentProps<"button">> = ({
  onClick,
  size,
  border,
  selected,
  children,
  shape,
  title,
  minWidth,
  style,
}) => {
  const [state, send] = useMachine(
    pressable.machine({
      id: createUniqueId(),
      onPress() {
        if (onClick) onClick();
      },
    })
  );

  const api = createMemo(() => pressable.connect(state, send, normalizeProps));

  return (
    <button
      title={title}
      class={ButtonStyle({
        border: border,
        size: size,
        selected: selected ? selected() : undefined,
        shape: shape,
        font: currentFont(),
      })}
      style={{
        ...(style as JSX.CSSProperties),
        "min-width": minWidth,
      }}
      {...api().pressableProps}
    >
      {children}
    </button>
  );
};
