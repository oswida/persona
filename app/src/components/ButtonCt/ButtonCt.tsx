import { Button } from "@kobalte/core";
import { ComponentProps } from "solid-js";
import { currentStyle } from "~/common";
import { ButtonStyle } from "./styles.css";

type Props = {
  onClick?: () => void;
  size?: "standard" | "small" | "big";
  border?: "standard" | "underline" | "none";
  selected?: boolean;
};

export const ButtonCt = ({
  size,
  border,
  children,
  onClick,
  title,
  ref,
  selected,
  disabled,
}: ComponentProps<"button"> & Props) => {
  return (
    <Button
      class={ButtonStyle({ border: border, size: size, selected: selected })}
      style={currentStyle()}
      title={title}
      ref={ref}
      onPressEnd={onClick}
      isDisabled={disabled}
    >
      {children}
    </Button>
  );
};
