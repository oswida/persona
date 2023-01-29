import * as select from "@zag-js/select";
import { Option } from "@zag-js/select/dist/select.types";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  Accessor,
  Component,
  createEffect,
  createMemo,
  createUniqueId,
} from "solid-js";
import { currentStyle } from "~/common";
import { ButtonStyle } from "../Button/styles.css";
import {
  SelectContentStyle,
  SelectItemStyle,
  SelectLabelStyle,
  SelectRootStyle,
  SelectTriggerStyle,
} from "./styles.css";

type Props = {
  label?: string;
  options: Accessor<Option[]>;
  selected?: number;
  width?: string;
  placeholder?: string;
  onChange?: (details: Option | null) => void;
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
      selectedOption: selected ? options()[selected] : null,
    })
  );
  const api = createMemo(() => select.connect(state, send, normalizeProps));

  createEffect(() => {
    api().selectedOption = selected ? options()[selected] : null;
  });

  return (
    <div style={{ ...currentStyle(), width: width }} class={SelectRootStyle}>
      <div class={SelectTriggerStyle}>
        <label class={SelectLabelStyle} {...api().labelProps}>
          {label}
        </label>
        <button
          class={ButtonStyle({ border: "underline" })}
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
