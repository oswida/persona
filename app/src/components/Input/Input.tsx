import { assignInlineVars } from "@vanilla-extract/dynamic";
import { ComponentProps, JSX, Match, Switch } from "solid-js";
import { currentTheme, themeVars } from "~/common";
import { InputStyle } from "./styles.css";

type Props = {
  underline?: boolean;
  center?: boolean;
  small?: boolean;
  middle?: boolean;
  transparent?: boolean;
};

export const Input = ({
  underline,
  center,
  title,
  style,
  ref,
  placeholder,
  small,
  transparent,
  onChange,
  onInput,
  value,
  middle,
  onBlur,
}: ComponentProps<"input"> & Props) => {
  return (
    <Switch>
      <Match when={value !== undefined}>
        <input
          class={InputStyle({
            center: center,
            underline: underline,
            small: small,
            middle: middle,
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
        />
      </Match>
      <Match when={value === undefined}>
        <input
          class={InputStyle({
            center: center,
            underline: underline,
            small: small,
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
        />
      </Match>
    </Switch>
  );
};
