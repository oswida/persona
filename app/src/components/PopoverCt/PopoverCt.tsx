import { Popover } from "@kobalte/core";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Accessor, Component, ParentProps, Setter } from "solid-js";
import { currentTheme, themeVars } from "~/common";
import { ButtonStyle } from "../ButtonCt/styles.css";
import {
  PopoverCloseButtonStyle,
  PopoverContentStyle,
  PopoverRootStyle,
  PopoverTitleStyle,
} from "./styles.css";

type Props = {
  trigger: any;
  title: string;
  open?: Accessor<boolean>;
  setOpen?: Setter<boolean>;
};

export const PopoverCt: Component<Props & ParentProps> = ({
  children,
  trigger,
  title,
  open,
  setOpen,
}) => {
  return (
    <Popover
      isOpen={open ? open() : undefined}
      onOpenChange={setOpen ? setOpen : undefined}
    >
      <Popover.Trigger
        class={ButtonStyle({})}
        style={assignInlineVars(themeVars, currentTheme())}
      >
        {trigger}
      </Popover.Trigger>
      {/* <Popover.Portal> */}
      <Popover.Content
        class={PopoverRootStyle}
        style={assignInlineVars(themeVars, currentTheme())}
      >
        <Popover.Arrow />
        <div
          style={{
            display: "flex",
            "justify-content": "space-between",
            "align-items": "center",
          }}
        >
          <Popover.Title
            class={PopoverTitleStyle}
            style={assignInlineVars(themeVars, currentTheme())}
          >
            {title}
          </Popover.Title>
          <Popover.CloseButton class={PopoverCloseButtonStyle}>
            ×
          </Popover.CloseButton>
        </div>
        <Popover.Description class={PopoverContentStyle}>
          {children}
        </Popover.Description>
      </Popover.Content>
      {/* </Popover.Portal> */}
    </Popover>
  );
};
