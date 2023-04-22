import { Component, For, createMemo, createSignal } from "solid-js";
import { DrawViewRootStyle } from "./styles.css";
import { Button, Flex, Select, SelectOption, Texte } from "~/components";
import {
    FaRegularCircle, FaRegularSquare, FaSolid1,
    FaSolid2, FaSolid3, FaSolid4, FaSolid5, FaSolidA, FaSolidArrowPointer,
    FaSolidBezierCurve,
    FaSolidDrawPolygon,
    FaSolidEraser, FaSolidLinesLeaning, FaSolidPalette, FaSolidPen, FaSolidPenFancy, FaSolidPlus
} from "solid-icons/fa";
import { FiTriangle } from "solid-icons/fi";
import { appAssets, appCanvas, drawColors, drawTool, setDrawTool, setWbState, wbState } from "~/common";
import { createAssetObject } from "../WhiteboardView/objects";



export const DrawView: Component = () => {
    const [selAsset, setSelAsset] = createSignal<string>("");

    const setStrokeColor = (color: string) => {
        setWbState((prev) => ({ ...prev, stroke: color }));
    }

    const setFillColor = (color: string) => {
        setWbState((prev) => ({ ...prev, fill: color }));
    }

    const setStrokeWidth = (width: number) => {
        setWbState((prev) => ({ ...prev, width: width }));
    }

    const assets = createMemo(() => {
        return Object.values(appAssets()).map((it) => {
            return { label: it.name, value: it.id } as SelectOption;
        });
    });

    const assetChange = (sel: SelectOption | null) => {
        if (!sel) return;
        setSelAsset(sel.value);
    }

    const insertAsset = () => {
        const a = selAsset();
        const cnv = appCanvas();
        if (a === "" || !cnv) return;
        createAssetObject(cnv, a, 100, 100, 0);
    }


    return <div class={DrawViewRootStyle}>
        <Texte size="bigger">Draw Tools</Texte>
        <Texte size="small">Stroke color </Texte>
        <Flex>
            <For each={drawColors}>{
                (it) => <Button
                    shape="icon"
                    title="Stroke color"
                    selected={() => wbState().stroke == it}
                    onClick={() => setStrokeColor(it)}>
                    <FaSolidPalette color={it} />
                </Button>
            }
            </For>
        </Flex>
        <Texte size="small">Fill color </Texte>
        <Flex>
            <For each={drawColors}>{
                (it) => <Button
                    shape="icon"
                    title="Fill color"
                    selected={() => wbState().fill == it}
                    onClick={() => setFillColor(it)}>
                    <FaSolidPalette color={it} />
                </Button>
            }
            </For>
        </Flex>
        <Texte size="small">Stroke size</Texte>
        <Flex>
            <Flex>
                <Button shape="icon"
                    onClick={() => setStrokeWidth(1)} selected={() => wbState().width == 1} >
                    <FaSolid1 />
                </Button>
                <Button shape="icon" onClick={() => setStrokeWidth(2)} selected={() => wbState().width == 2}>
                    <FaSolid2 />
                </Button>
                <Button shape="icon" onClick={() => setStrokeWidth(3)} selected={() => wbState().width == 3}>
                    <FaSolid3 />
                </Button>
                <Button shape="icon" onClick={() => setStrokeWidth(4)} selected={() => wbState().width == 4}>
                    <FaSolid4 />
                </Button>
                <Button shape="icon" onClick={() => setStrokeWidth(5)} selected={() => wbState().width == 5}>
                    <FaSolid5 />
                </Button>
            </Flex>
        </Flex>
        <Texte size="small">Tools</Texte>
        <Flex>
            <Button
                shape="icon"
                title="Select object"
                onClick={() => setDrawTool("select")}
                selected={() => drawTool() === "select"}>
                <FaSolidArrowPointer />
            </Button>
            <Button
                shape="icon"
                title="Insert text"
                onClick={() => setDrawTool("text")}
                selected={() => drawTool() === "text"}>
                <FaSolidA />
            </Button>
            <Button shape="icon" title="Insert circle"
                onClick={() => setDrawTool("circle")}
                selected={() => drawTool() === "circle"}>
                <FaRegularCircle />
            </Button>
            <Button shape="icon" title="Insert triangle"
                onClick={() => setDrawTool("triangle")}
                selected={() => drawTool() === "triangle"}>
                <FiTriangle />
            </Button>
            <Button shape="icon" title="Insert rectangle"
                onClick={() => setDrawTool("rectangle")}
                selected={() => drawTool() === "rectangle"}>
                <FaRegularSquare />
            </Button>
            <Button shape="icon" title="Insert line"
                onClick={() => setDrawTool("line")}
                selected={() => drawTool() === "line"}>
                <FaSolidLinesLeaning />
            </Button>
            <Button shape="icon" title="Free draw"
                onClick={() => setDrawTool("freedraw")}
                selected={() => drawTool() === "freedraw"}>
                <FaSolidPenFancy />
            </Button>
            <Button shape="icon" title="Erase objects"
                style={{ "margin-left": "15px" }}
                onClick={() => setDrawTool("eraser")}
                selected={() => drawTool() === "eraser"}>
                <FaSolidEraser />
            </Button>
        </Flex>
        <Texte size="small">Assets</Texte>
        <Flex>
            <Select options={assets}
                onChange={assetChange} />
            <Button shape="icon" title="Insert selected asset" onClick={insertAsset}>
                <FaSolidPlus />
            </Button>
        </Flex>
    </div>
}