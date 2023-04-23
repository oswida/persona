import { Component, For, createMemo, createSignal } from "solid-js";
import { DrawViewRootStyle } from "./styles.css";
import { Button, Flex, SelectOption, StrInputState, Texte, setStrInputData } from "~/components";
import {
    FaRegularCircle, FaRegularSquare, FaSolid1,
    FaSolid2, FaSolid3, FaSolid4, FaSolid5, FaSolidA, FaSolidArrowPointer,
    FaSolidEraser, FaSolidLinesLeaning, FaSolidPalette, FaSolidPenFancy
} from "solid-icons/fa";
import { FiTriangle } from "solid-icons/fi";
import { appAssets, appCanvas, appCards, appCounters, drawColors, drawTool, exportData, importData, prettyToday, setDrawTool, setWbState, wbState } from "~/common";

import { ListTool } from "./ListTool";
import { addAsset } from "../WhiteboardView/assets";
import { addCard } from "../WhiteboardView/cards";
import { addCounter } from "../WhiteboardView/counters";

export const DrawView: Component = () => {
    const [selAsset, setSelAsset] = createSignal<string>("");
    const [selCard, setSelCard] = createSignal<string>("");
    const [selCounter, setSelCounter] = createSignal<string>("");
    const [assetFilter, setAssetFilter] = createSignal("");
    const [cardFilter, setCardFilter] = createSignal("");
    const [counterFilter, setCounterFilter] = createSignal("");

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
        return Object.values(appAssets())
            .filter((it) => assetFilter() == "" || it.name.toLowerCase().includes(assetFilter().toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((it) => {
                return { label: it.name, value: it.id } as SelectOption;
            });
    });

    const cards = createMemo(() => {
        return Object.values(appCards())
            .filter((it) => cardFilter() == "" || it.title.toLowerCase().includes(cardFilter().toLowerCase()))
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((it) => {
                return { label: it.title, value: it.id } as SelectOption;
            });
    });

    const counters = createMemo(() => {
        return Object.values(appCounters())
            .filter((it) => counterFilter() == "" || it.title.toLowerCase().includes(counterFilter().toLowerCase()))
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((it) => {
                return { label: it.title, value: it.id } as SelectOption;
            });
    });

    const assetChange = (sel: SelectOption | null) => {
        if (!sel) return;
        setSelAsset(sel.value);
    }

    const insertAsset = () => {
        const a = selAsset();
        if (a === "") return;
        setStrInputData({
            open: true,
            title: "Add asset",
            message: "Input asset name",
            value: "name",
            accept: (value: string) => {
                addAsset(a, 100, 100, value);
            },
            width: "10em",
        } as StrInputState);
    }

    const cardChange = (sel: SelectOption | null) => {
        if (!sel) return;
        setSelCard(sel.value);
    }

    const insertCard = () => {
        const c = selCard();
        if (c === "") return;
        addCard(c, 100, 100);
    }

    const counterChange = (sel: SelectOption | null) => {
        if (!sel) return;
        setSelCounter(sel.value);
    }

    const insertCounter = () => {
        const c = selCounter();
        if (c === "") return;
        const item = appCounters()[c];
        if (!item) return;
        setStrInputData({
            open: true,
            title: "Add counter",
            message: "Input counter name",
            value: item.title,
            accept: (value: string) => {
                addCounter(item.id, 100, 100, value);
            },
            width: "10em",
        } as StrInputState);
    }

    const exportTable = () => {
        const cnv = appCanvas();
        if (!cnv) return;
        const data = cnv.toJSON();
        const filename = `table-${prettyToday()}.json`;
        exportData(data, filename);
    };

    const importTable = () => {
        importData(async (data: any) => {
            const cnv = appCanvas();
            if (!cnv) return;
            cnv.loadFromJSON(data, () => { }).then((canvas) => {
                canvas.requestRenderAll();
                // TODO: publish if hosting
            });
        });
    };

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
        <ListTool
            options={assets}
            optionChange={assetChange}
            action={insertAsset}
            applyFilter={(value: string) => setAssetFilter(value)}
        />
        <Texte size="small">Cards</Texte>
        <ListTool
            options={cards}
            optionChange={cardChange}
            action={insertCard}
            applyFilter={(value: string) => setCardFilter(value)}
        />
        <Texte size="small">Counters</Texte>
        <ListTool
            options={counters}
            optionChange={counterChange}
            action={insertCounter}
            applyFilter={(value: string) => setCounterFilter(value)}
        />
        <Texte size="small">Actions</Texte>
        <Flex>
            <Button onClick={exportTable} title="Export table">
                Export table
            </Button>
            <Button onClick={importTable} title="Import table">
                Import table
            </Button>
        </Flex>
    </div>
}