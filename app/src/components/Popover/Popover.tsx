import * as popover from "@zag-js/popover";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
  Accessor,
  Component,
  createEffect,
  createMemo,
  createUniqueId,
  ParentProps,
  Setter,
  Show,
} from "solid-js";
import { Button } from "../Button";
import { Flex } from "../Flex";
import {
  PopoverCloseButtonStyle,
  PopoverContentStyle,
  PopoverPositionerStyle,
  PopoverRootStyle,
  PopoverTitleStyle,
} from "./styles.css";

type Props = {
  trigger: any;
  title: string;
  open?: Accessor<boolean>;
  setOpen?: Setter<boolean>;
};

export const Popover: Component<Props & ParentProps> = ({
  trigger,
  title,
  children,
  open,
  setOpen,
}) => {
  const [state, send] = useMachine(
    popover.machine({
      id: createUniqueId(),
      closeOnEsc: true,
      positioning: {
        strategy: "absolute",
        fitViewport: true,
      },
      onEscapeKeyDown: () => {
        api().close();
        if (setOpen) setOpen(false);
      },
    })
  );

  const api = createMemo(() => popover.connect(state, send, normalizeProps));

  createEffect(() => {
    if (open && open()) {
      api().open();
    }
  });

  return (
    <div>
      <Button
        {...api().triggerProps}
        onClick={() => {
          api().open();
          if (setOpen) setOpen(true);
        }}
      >
        {trigger}
      </Button>
      <Show when={open ? open() : api().open}>
        <div
          class={PopoverPositionerStyle}
          {...api().positionerProps}
          style={{ opacity: api().isOpen ? 1 : 0 }}
        >
          <div {...api().contentProps} class={PopoverRootStyle}>
            <Flex>
              <div {...api().titleProps} class={PopoverTitleStyle}>
                {title}
              </div>
              <button
                {...api().closeTriggerProps}
                onClick={() => {
                  api().close();
                  if (setOpen) setOpen(false);
                }}
                class={PopoverCloseButtonStyle}
              >
                ×
              </button>
            </Flex>
            <div {...api().descriptionProps} class={PopoverContentStyle}>
              {children}
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};
