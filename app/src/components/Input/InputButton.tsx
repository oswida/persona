import { assignInlineVars } from "@vanilla-extract/dynamic";
import { ComponentProps, JSX } from "solid-js";
import { themeVars } from "~/common";
import { InputButtonStyle } from "./styles.css";

type Props = {
  size?: "standard" | "small";
};

export const InputButton = ({
  title,
  style,
  ref,
  placeholder,
  size,
  onChange,
}: ComponentProps<"input"> & Props) => {
  return (
    <input
      class={InputButtonStyle({
        size: size,
      })}
      style={{
        // ...assignInlineVars(themeVars, currentTheme()),
        ...(style as JSX.CSSProperties),
      }}
      title={title}
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};
