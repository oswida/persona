import { useI18n } from "@solid-primitives/i18n";
import { fabric } from "fabric";
import {
  FaRegularCircle,
  FaRegularSquare,
  FaSolid1,
  FaSolid2,
  FaSolid3,
  FaSolid4,
  FaSolid5,
  FaSolidArrowDownShortWide,
  FaSolidArrowPointer,
  FaSolidBorderNone,
  FaSolidEraser,
  FaSolidFileExport,
  FaSolidFileImport,
  FaSolidFont,
  FaSolidGlassWater,
  FaSolidLinesLeaning,
  FaSolidPaintbrush,
  FaSolidPalette,
  FaSolidPencil,
  FaSolidShareNodes,
  FaSolidTextWidth,
  FaSolidTrash,
  FaSolidWineGlassEmpty,
} from "solid-icons/fa";
import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import {
  exportData,
  importData,
  prettyToday,
  runtimeColors,
  wbState,
} from "~/common";
import { Button, Flex, Popover, Texte } from "~/components";

import { clearCanvas, initCanvas } from "./canvas";
import { WhiteboardRootStyle, WhiteboardToolsStyle } from "./styles.css";
import {
  ColorSwitchButton,
  FillSwitchButton,
  SizeSwitchButton,
  ToolSwitchButton,
} from "./Tools";

export const WhiteboardView: Component = () => {
  let [canvas, setCanvas] = createSignal<fabric.Canvas>();
  let [brushView, setBrushView] = createSignal(false);
  let [fillView, setFillView] = createSignal(false);
  let [sizeView, setSizeView] = createSignal(false);
  let boardRoot: HTMLDivElement;

  const [t] = useI18n();

  const keySupport = (e: any) => {
    const cnv = canvas();
    if (!cnv) return;
    const el = document.getElementById("whiteboardCanvas");
    if (!el) return;
    const style = window.getComputedStyle(el);
    console.log("key", style.visibility);
  };

  const save = (e: any) => {
    // const cnv = canvas();
    // if (!cnv) return;
    // const draw = cnv.toJSON();
    // saveGenericData(inodDrawKey, draw);
  };

  createEffect(() => {
    window.removeEventListener("keypress", keySupport);
    const cnv = initCanvas("whiteboardCanvas", 1920, 1080);
    setCanvas(cnv);
    // const data = loadDraw();
    // cnv.loadFromJSON(data, () => {});
    cnv.on("object:added", save);
    cnv.on("object:modified", save);
    cnv.on("object:removed", save);
    cnv.on("canvas:cleared", save);
    window.addEventListener("keypress", keySupport);
  });

  createEffect(() => {
    // const data = apd?.drawCache();
    // const cnv = canvas();
    // if (!data || Object.keys(data).length == 0 || !cnv) return;
    // cnv.loadFromJSON(data, () => {});
    // saveGenericData(inodDrawKey, data);
  });

  const importImage = () => {
    importData(async (data: any) => {
      canvas()?.loadFromJSON(data, () => {});
    });
  };

  const exp = () => {
    const data = canvas()?.toJSON();
    const filename = `draw-${prettyToday()}.json`;
    exportData(data, filename);
  };

  const share = () => {
    // const cl = apd.mqttClient();
    // if (!cl) return;
    // const cnv = canvas();
    // if (!cnv) return;
    // const draw = cnv.toJSON();
    // mqttPublish(sessionData().browserID, cl, mqttTopic(topicDraw), draw);
    // notify(apd, "Drawing published", 3000);
  };

  const strokeColors = [
    "transparent",
    "white",
    runtimeColors.blue,
    runtimeColors.yellow,
    runtimeColors.green,
    runtimeColors.pink,
  ];

  const fillColors = [
    "transparent",
    "white",
    runtimeColors.blue,
    runtimeColors.yellow,
    runtimeColors.green,
    runtimeColors.pink,
  ];

  const strokeIcon = () => {
    if (wbState().brush != "transparent")
      return <FaSolidPalette color={wbState().brush} />;
    else return <FaSolidPalette color={runtimeColors.background100a70} />;
  };

  const sizeIcon = (width: number) => {
    switch (width) {
      case 0:
        return <FaSolid1 />;
      case 1:
        return <FaSolid2 />;
      case 2:
        return <FaSolid3 />;
      case 3:
        return <FaSolid4 />;
      case 4:
        return <FaSolid5 />;
    }
  };

  const fillIcon = () => {
    if (wbState().fill != "transparent")
      return <FaSolidPaintbrush color={wbState().fill} />;
    else return <FaSolidPaintbrush color={runtimeColors.background100a70} />;
  };

  return (
    <Flex type="column">
      <div class={WhiteboardToolsStyle}>
        <Flex>
          <ToolSwitchButton canvas={canvas} tool="select" title={t("Select")}>
            <FaSolidArrowPointer />
          </ToolSwitchButton>
          <ToolSwitchButton canvas={canvas} tool="pencil">
            <FaSolidPencil title="Pencil" />
          </ToolSwitchButton>
          <ToolSwitchButton canvas={canvas} tool="line">
            <FaSolidLinesLeaning title="Line" />
          </ToolSwitchButton>
          <ToolSwitchButton canvas={canvas} tool="rect">
            <FaRegularSquare title="Rect" />
          </ToolSwitchButton>
          <ToolSwitchButton canvas={canvas} tool="circle">
            <FaRegularCircle title="Circle" />
          </ToolSwitchButton>
          <ToolSwitchButton canvas={canvas} tool="text">
            <FaSolidFont title="Text" />
          </ToolSwitchButton>
          <ToolSwitchButton canvas={canvas} tool="eraser">
            <FaSolidEraser title="Eraser" />
          </ToolSwitchButton>
          <Button
            onClick={() => clearCanvas(canvas())}
            style={{ "margin-left": "20px" }}
          >
            <FaSolidTrash title="Clear" />
          </Button>
        </Flex>

        <Flex>
          <Popover
            trigger={
              <Dynamic component="i" style={{ width: "1em", height: "1em" }}>
                {strokeIcon()}
              </Dynamic>
            }
            title="Select stroke color"
            open={brushView}
            setOpen={setBrushView}
          >
            <Flex>
              <For each={strokeColors}>
                {(item) => (
                  <ColorSwitchButton
                    color={item}
                    canvas={canvas}
                    postClick={() => setBrushView(false)}
                  />
                )}
              </For>
            </Flex>
          </Popover>

          <Popover
            trigger={
              <Dynamic component="i" style={{ width: "1em", height: "1em" }}>
                {fillIcon()}
              </Dynamic>
            }
            title="Select fill color"
            open={fillView}
            setOpen={setFillView}
          >
            <Flex>
              <For each={fillColors}>
                {(item) => (
                  <FillSwitchButton
                    color={item}
                    canvas={canvas}
                    postClick={() => setFillView(false)}
                  />
                )}
              </For>
            </Flex>
          </Popover>

          <Popover
            trigger={
              <Dynamic component="i" style={{ width: "1em", height: "1em" }}>
                {sizeIcon(wbState().width)}
              </Dynamic>
            }
            title="Select stroke size"
            open={sizeView}
            setOpen={setSizeView}
          >
            <Flex>
              <For each={[0, 1, 2, 3]}>
                {(item) => (
                  <SizeSwitchButton
                    canvas={canvas}
                    index={item}
                    postClick={() => setSizeView(false)}
                  >
                    {sizeIcon(item)}
                  </SizeSwitchButton>
                )}
              </For>
            </Flex>
          </Popover>
        </Flex>
        <Flex>
          <Button onClick={share} border="none" title={t("Share")}>
            <FaSolidShareNodes />
          </Button>
          <Button onClick={importImage} border="none" title={t("Import")}>
            <FaSolidFileImport />
          </Button>
          <Button onClick={exp} border="none" title={t("Export")}>
            <FaSolidFileExport />
          </Button>
        </Flex>
      </div>
      <div class={WhiteboardRootStyle} ref={(el) => (boardRoot = el)}>
        <canvas id="whiteboardCanvas" width={1920} height={1080} />
      </div>
    </Flex>
  );
};
