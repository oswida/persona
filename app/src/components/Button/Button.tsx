import * as pressable from "@zag-js/pressable";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  Accessor,
  Component,
  ComponentProps,
  createMemo,
  createUniqueId,
  JSX,
  ParentProps,
} from "solid-js";
import { ButtonStyle } from "./styles.css";

type Props = {
  onClick?: () => void;
  size?: "standard" | "small" | "big";
  border?: "standard" | "underline" | "none";
  selected?: boolean;
 
};

export const Button: Component<Props & ComponentProps<"button">> = ({
  onClick,
  size,
  border,
  selected,
  children,
  title,
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
        selected: selected,
      })}
      {...api().pressableProps}
    >
      {children}
    </button>
  );
};
