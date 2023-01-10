import { Button, PressEvent } from "@kobalte/core";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { ComponentProps } from "solid-js";
import { currentTheme, themeVars } from "~/common";
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
      style={assignInlineVars(themeVars, currentTheme())}
      title={title}
      ref={ref}
      onPressEnd={onClick}
      isDisabled={disabled}
    >
      {children}
    </Button>
  );
};
