import { Component, For, createMemo, createSignal } from "solid-js";
import { DrawViewRootStyle } from "./styles.css";
import { Button, Flex, Input, Select, SelectOption, StrInputState, Texte, setStrInputData } from "~/components";
import {
    FaRegularCircle, FaRegularSquare, FaSolid1,
    FaSolid2, FaSolid3, FaSolid4, FaSolid5, FaSolidA, FaSolidArrowPointer,
    FaSolidDeleteLeft,
    FaSolidEraser, FaSolidLinesLeaning, FaSolidPalette, FaSolidPenFancy, FaSolidPlus
} from "solid-icons/fa";
import { FiTriangle } from "solid-icons/fi";
import { appAssets, appCanvas, appCards, drawColors, drawTool, exportData, importData, prettyToday, setDrawTool, setWbState, wbState } from "~/common";
import { addAsset, addCard } from "../WhiteboardView/helper";

export const DrawView: Component = () => {
    const [selAsset, setSelAsset] = createSignal<string>("");
    const [selCard, setSelCard] = createSignal<string>("");
    const [filter, setFilter] = createSignal("");
    const [filter2, setFilter2] = createSignal("");
    let refFlt: HTMLInputElement;
    let refFlt2: HTMLInputElement;

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
            .filter((it) => filter() == "" || it.name.toLowerCase().includes(filter().toLowerCase()))
            .map((it) => {
                return { label: it.name, value: it.id } as SelectOption;
            });
    });

    const cards = createMemo(() => {
        return Object.values(appCards())
            .filter((it) => filter2() == "" || it.title.toLowerCase().includes(filter2().toLowerCase()))
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

    const flt = () => {
        if (!refFlt) return;
        setFilter(refFlt.value.trim());
    };

    const flt2 = () => {
        if (!refFlt2) return;
        setFilter2(refFlt2.value.trim());
    };

    const clear = () => {
        if (!refFlt) return;
        setFilter("");
        refFlt.value = "";
    };

    const clear2 = () => {
        if (!refFlt2) return;
        setFilter2("");
        refFlt2.value = "";
    };

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
        <Flex vcenter >
            <Select options={assets} onChange={assetChange} />
            <Button shape="icon" title="Insert selected asset" onClick={insertAsset}>
                <FaSolidPlus />
            </Button>
            <Flex vcenter style={{ "justify-content": "flex-end", "margin-left": "10px" }}>
                <Texte size="small">Filter: </Texte>
                <Input size="small"
                    underline transparent
                    ref={(e) => (refFlt = e)}
                    onInput={flt}
                    style={{ width: "8em" }} />
                <Button shape="icon" size="small" onClick={clear}>
                    <FaSolidDeleteLeft />
                </Button>
            </Flex>
        </Flex>
        <Texte size="small">Cards</Texte>
        <Flex vcenter >
            <Select options={cards} onChange={cardChange} />
            <Button shape="icon" title="Insert selected card" onClick={insertCard}>
                <FaSolidPlus />
            </Button>
            <Flex vcenter style={{ "justify-content": "flex-end", "margin-left": "10px" }}>
                <Texte size="small">Filter: </Texte>
                <Input size="small"
                    underline transparent
                    ref={(e) => (refFlt2 = e)}
                    onInput={flt2}
                    style={{ width: "8em" }} />
                <Button shape="icon" size="small" onClick={clear2}>
                    <FaSolidDeleteLeft />
                </Button>
            </Flex>
        </Flex>
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