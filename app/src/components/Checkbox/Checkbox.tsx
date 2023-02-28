import * as checkbox from "@zag-js/checkbox";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { Component, createMemo, createUniqueId, JSX, Show } from "solid-js";
import { CheckboxControlStyle, CheckboxRootStyle } from "./styles.css";

type Props = {
  label?: string;
  value?: boolean;
  title?: string;
  rotate?: string;
  style?: string | JSX.CSSProperties | undefined;
  onChange: (checked: boolean) => void;
};

export const Checkbox: Component<Props> = ({
  label,
  onChange,
  title,
  value,
  style,
}) => {
  const [state, send] = useMachine(
    checkbox.machine({
      id: createUniqueId(),
      onChange: (details: { checked: boolean | "indeterminate" }) => {
        if (details.checked != "indeterminate") onChange(details.checked);
      },
      defaultChecked: value,
    })
  );

  const api = createMemo(() => checkbox.connect(state, send, normalizeProps));

  return (
    <label
      title={title}
      class={CheckboxRootStyle}
      style={style}
      {...api().rootProps}
    >
      <input {...api().inputProps} />
      <div
        class={CheckboxControlStyle({ checked: api().isChecked })}
        {...api().controlProps}
      />
      <Show when={label}>
        <span {...api().labelProps}>{label}</span>
      </Show>
    </label>
  );
};
