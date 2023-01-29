import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as editable from "@zag-js/editable";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { FaSolidPencil } from "solid-icons/fa";
import {
  Component,
  ComponentProps,
  createMemo,
  createSignal,
  createUniqueId,
  JSX,
  Show,
} from "solid-js";
import { currentTheme, themeVars } from "~/common";
import { Button } from "../Button";
import { EditableFlex, EditableStyle } from "./styles.css";

type Props = {
  underline?: boolean;
  center?: boolean;
  fontSize?: "standard" | "smaller" | "small";
  transparent?: boolean;
};

export const Editable: Component<ComponentProps<"input"> & Props> = ({
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
}) => {
  const [state, send] = useMachine(
    editable.machine({
      id: createUniqueId(),

      submitMode: "both",
      value: value?.toString(),
    })
  );

  const api = createMemo(() => editable.connect(state, send, normalizeProps));

  return (
    <div {...api().rootProps}>
      <div class={EditableFlex} {...api().areaProps}>
        <input
          class={EditableStyle({
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
          {...api().inputProps}
        />

        <span {...api().previewProps} />
      </div>
    </div>
  );
};
