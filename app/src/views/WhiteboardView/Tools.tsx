import { PressEvent } from "@kobalte/core";
import { FaSolidPaintbrush, FaSolidPalette } from "solid-icons/fa";
import { Accessor, createMemo, Match, ParentProps, Switch } from "solid-js";
import { wbState } from "~/common";
import { ButtonCt } from "~/components";
import { fillcolor, linecolor, linesize, switchTool } from "./canvas";

export const ToolSwitchButton = ({
  tool,
  children,
  canvas,
  title,
}: ParentProps & {
  tool: string;
  title?: string;
  canvas: Accessor<fabric.Canvas | undefined>;
}) => {
  const isCurrentTool = createMemo(() => tool == wbState().tool);
  return (
    <Switch>
      <Match when={isCurrentTool()}>
        <ButtonCt
          selected
          onClick={() => switchTool(canvas(), tool)}
          title={title}
        >
          {children}
        </ButtonCt>
      </Match>
      <Match when={!isCurrentTool()}>
        <ButtonCt onClick={() => switchTool(canvas(), tool)} title={title}>
          {children}
        </ButtonCt>
      </Match>
    </Switch>
  );
};

export const ColorSwitchButton = ({
  color,
  canvas,
  postClick,
}: ParentProps & {
  color: string;
  canvas: Accessor<fabric.Canvas | undefined>;
  postClick?: () => void;
}) => {
  const isCurrentColor = createMemo(() => color == wbState().brush);
  return (
    <Switch>
      <Match when={!isCurrentColor()}>
        <ButtonCt
          onClick={() => {
            linecolor(canvas(), color);
            if (postClick) postClick();
          }}
          border="underline"
        >
          <FaSolidPalette title={color} color={color} />
        </ButtonCt>
      </Match>
      <Match when={isCurrentColor()}>
        <ButtonCt
          onClick={() => {
            linecolor(canvas(), color);
            if (postClick) postClick();
          }}
        >
          <FaSolidPalette title={color} color={color} />
        </ButtonCt>
      </Match>
    </Switch>
  );
};

export const SizeSwitchButton = ({
  index,
  children,
  canvas,
  postClick,
}: ParentProps & {
  index: number;
  canvas: Accessor<fabric.Canvas | undefined>;
  postClick?: () => void;
}) => {
  const isCurrentSize = createMemo(() => wbState().width === index);

  return (
    <Switch>
      <Match when={isCurrentSize()}>
        <ButtonCt
          onClick={() => {
            linesize(canvas(), index);
            if (postClick) postClick();
          }}
        >
          {children}
        </ButtonCt>
      </Match>
      <Match when={!isCurrentSize()}>
        <ButtonCt
          onClick={() => {
            linesize(canvas(), index);
            if (postClick) postClick();
          }}
          border="underline"
        >
          {children}
        </ButtonCt>
      </Match>
    </Switch>
  );
};

export const FillSwitchButton = ({
  color,
  canvas,
  postClick,
}: ParentProps & {
  color: string;
  canvas: Accessor<fabric.Canvas | undefined>;
  postClick?: () => void;
}) => {
  const isCurrentColor = createMemo(() => color == wbState().fill);
  return (
    <Switch>
      <Match when={!isCurrentColor()}>
        <ButtonCt
          onClick={() => {
            fillcolor(canvas(), color);
            if (postClick) postClick();
          }}
          border="underline"
        >
          <FaSolidPaintbrush title={color} color={color} />
        </ButtonCt>
      </Match>
      <Match when={isCurrentColor()}>
        <ButtonCt
          onClick={() => {
            fillcolor(canvas(), color);
            if (postClick) postClick();
          }}
        >
          <FaSolidPaintbrush title={color} color={color} />
        </ButtonCt>
      </Match>
    </Switch>
  );
};
