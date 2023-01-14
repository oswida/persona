import { assignInlineVars } from "@vanilla-extract/dynamic";
import { ComponentProps, JSX, Match, Switch } from "solid-js";
import { currentTheme, themeVars } from "~/common";
import { InputStyle } from "./styles.css";

type Props = {
  underline?: boolean;
  center?: boolean;
  size?: "standard" | "smaller" | "small";
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
  size,
  onBlur,
  onKeyUp,
  disabled,
}: ComponentProps<"input"> & Props) => {
  return (
    <Switch>
      <Match when={value !== undefined}>
        <input
          class={InputStyle({
            center: center,
            underline: underline,
            size: size,
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
        />
      </Match>
      <Match when={value === undefined}>
        <input
          class={InputStyle({
            center: center,
            underline: underline,
            size: size,
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
        />
      </Match>
    </Switch>
  );
};
