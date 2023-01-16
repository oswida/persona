import { assignInlineVars } from "@vanilla-extract/dynamic";
import { ComponentProps, JSX, Match, Switch } from "solid-js";
import { currentTheme, themeVars } from "~/common";
import { InputStyle } from "./styles.css";

type Props = {
  underline?: boolean;
  center?: boolean;
  fontSize?: "standard" | "smaller" | "small";
  transparent?: boolean;
};

export const Input = ({
  underline,
  center,
  title,
  style,
  ref,
  placeholder,
  transparent,
  onChange,
  onInput,
  value,
  fontSize,
  onBlur,
  onKeyUp,
  disabled,
  size,
}: ComponentProps<"input"> & Props) => {
  return (
    <Switch>
      <Match when={value !== undefined}>
        <input
          class={InputStyle({
            center: center,
            underline: underline,
            size: fontSize,
            transparent: transparent,
          })}
          style={{
            ...assignInlineVars(themeVars, currentTheme()),
            ...(style as JSX.CSSProperties),
          }}
          title={title}
          ref={ref}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onInput={onInput}
          value={value}
          onKeyUp={onKeyUp}
          disabled={disabled}
          size={size}
        />
      </Match>
      <Match when={value === undefined}>
        <input
          class={InputStyle({
            center: center,
            underline: underline,
            size: fontSize,
          })}
          style={{
            ...assignInlineVars(themeVars, currentTheme()),
            ...(style as JSX.CSSProperties),
          }}
          title={title}
          ref={ref}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onInput={onInput}
          onKeyUp={onKeyUp}
          disabled={disabled}
          size={size}
        />
      </Match>
    </Switch>
  );
};
