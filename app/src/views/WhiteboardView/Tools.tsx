import { FaSolidPaintbrush, FaSolidPalette } from "solid-icons/fa";
import { ParentProps, createMemo, Switch, Match, Accessor } from "solid-js";
import { wbState } from "~/common";
import { Button } from "~/components";
import {
  fillcolor,
  linecolor,
  linesize,
  linesSizeMap,
  switchTool,
} from "./canvas";

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
        <Button
          color="filled"
          onClick={() => switchTool(canvas(), tool)}
          title={title}
        >
          {children}
        </Button>
      </Match>
      <Match when={!isCurrentTool()}>
        <Button onClick={() => switchTool(canvas(), tool)} title={title}>
          {children}
        </Button>
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
        <Button
          onClick={() => {
            linecolor(canvas(), color);
            if (postClick) postClick();
          }}
          border="underline"
        >
          <FaSolidPalette title={color} color={color} />
        </Button>
      </Match>
      <Match when={isCurrentColor()}>
        <Button
          onClick={() => {
            linecolor(canvas(), color);
            if (postClick) postClick();
          }}
        >
          <FaSolidPalette title={color} color={color} />
        </Button>
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
        <Button
          onClick={() => {
            linesize(canvas(), index);
            if (postClick) postClick();
          }}
        >
          {children}
        </Button>
      </Match>
      <Match when={!isCurrentSize()}>
        <Button
          onClick={() => {
            linesize(canvas(), index);
            if (postClick) postClick();
          }}
          border="underline"
        >
          {children}
        </Button>
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
        <Button
          onClick={() => {
            fillcolor(canvas(), color);
            if (postClick) postClick();
          }}
          border="underline"
        >
          <FaSolidPaintbrush title={color} color={color} />
        </Button>
      </Match>
      <Match when={isCurrentColor()}>
        <Button
          onClick={() => {
            fillcolor(canvas(), color);
            if (postClick) postClick();
          }}
        >
          <FaSolidPaintbrush title={color} color={color} />
        </Button>
      </Match>
    </Switch>
  );
};
