import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Component, ComponentProps, JSX, ParentProps } from "solid-js";
import { themeVars, currentTheme, currentStyle } from "~/common";
import { TexteStyle } from "./styles.css";

type Props = {
  align?: "right" | "left" | "center";
  size?: "regular" | "middle" | "small" | "xsmall" | "bigger";
  weight?: 400 | 700;
  themeColor?: "primary" | "secondary" | "background" | "none";
};

export const Texte: Component<ComponentProps<"div"> & Props> = ({
  children,
  style,
  align,
  size,
  weight,
  color,
  ref,
  onClick,
  themeColor,
  title,
}) => {
  return (
    <div
      class={TexteStyle({
        size: size,
        align: align,
        weight: weight,
        clickable: onClick ? true : undefined,
        themeColor: themeColor,
      })}
      style={{
        ...currentStyle(),
        ...(style as JSX.CSSProperties),
      }}
      ref={ref}
      onClick={onClick}
      title={title}
      color={color}
    >
      {children}
    </div>
  );
};
