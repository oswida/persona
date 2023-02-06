import * as select from "@zag-js/select";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  Accessor,
  Component,
  createMemo,
  createUniqueId,
  Show,
} from "solid-js";
import { currentFont } from "~/common";
import { ButtonStyle } from "../Button/styles.css";
import {
  SelectContentStyle,
  SelectItemStyle,
  SelectLabelStyle,
  SelectRootStyle,
  SelectTriggerStyle,
} from "./styles.css";

export type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  options: Accessor<SelectOption[]>;
  selected?: Accessor<number>;
  width?: string;
  placeholder?: string;
  onChange?: (details: SelectOption | null) => void;
};

export const Select: Component<Props> = ({
  label,
  options,
  width,
  placeholder,
  selected,
  onChange,
}) => {
  const [state, send] = useMachine(
    select.machine({
      id: createUniqueId(),
      onChange: onChange,
      selectedOption: selected ? options()[selected()] : null,
    })
  );
  const api = createMemo(() => select.connect(state, send, normalizeProps));

  return (
    <div style={{ width: width }} class={SelectRootStyle}>
      <div class={SelectTriggerStyle}>
        <Show when={label && label.trim() != ""}>
          <label class={SelectLabelStyle} {...api().labelProps}>
            {label}
          </label>
        </Show>
        <button
          class={ButtonStyle({ border: "standard", font: currentFont() })}
          {...api().triggerProps}
        >
          <span>
            {api().selectedOption?.label ?? placeholder ?? "Select option"}
          </span>
        </button>
      </div>

      <div class={SelectContentStyle} {...api().positionerProps}>
        <div {...api().contentProps}>
          {options().map(({ label, value }) => (
            <div
              class={SelectItemStyle}
              id={value}
              {...api().getOptionProps({ label, value })}
            >
              <span>{label}</span>
              {value === api().selectedOption?.value && "✓"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
