import { Component, For } from "solid-js";
import { DrawViewRootStyle } from "./styles.css";
import { Button, Flex, Texte } from "~/components";
import { FaRegularCircle, FaRegularSquare, FaSolid1, FaSolid2, FaSolid3, FaSolid4, FaSolid5, FaSolidA, FaSolidChartLine, FaSolidCircle, FaSolidEgg, FaSolidEllipsisVertical, FaSolidLinesLeaning, FaSolidPaintbrush, FaSolidPalette, FaSolidRectangleAd, FaSolidSquare, FaSolidTriangleExclamation } from "solid-icons/fa";
import { Canvas } from "fabric";
import { addCircle, addRectangle, addText } from "./helper";
import { appCanvas, drawColors, setWbState, wbState } from "~/common";


export const DrawView: Component = () => {
    const setStrokeColor = (color: string) => {
        setWbState((prev) => ({ ...prev, stroke: color }));
    }

    const setFillColor = (color: string) => {
        setWbState((prev) => ({ ...prev, fill: color }));
    }

    return <div class={DrawViewRootStyle}>
        <Texte size="bigger">Draw Tools</Texte>
        <Texte size="middle">Settings</Texte>
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
        <Flex style={{ gap: "20px" }}>
            <Flex dn="column">
                <Texte size="small">Stroke size</Texte>
                <Flex>
                    <Button shape="icon">
                        <FaSolid1 />
                    </Button>
                    <Button shape="icon">
                        <FaSolid2 />
                    </Button>
                    <Button shape="icon">
                        <FaSolid3 />
                    </Button>
                    <Button shape="icon">
                        <FaSolid4 />
                    </Button>
                    <Button shape="icon">
                        <FaSolid5 />
                    </Button>
                </Flex>
            </Flex>
            <Flex dn="column">
                <Texte size="small">Object size</Texte>
                <Flex>
                    <Button shape="icon">
                        <FaSolid1 />
                    </Button>
                    <Button shape="icon">
                        <FaSolid2 />
                    </Button>
                    <Button shape="icon">
                        <FaSolid3 />
                    </Button>
                    <Button shape="icon">
                        <FaSolid4 />
                    </Button>
                    <Button shape="icon">
                        <FaSolid5 />
                    </Button>
                </Flex>
            </Flex>
        </Flex>
        <Texte size="middle">Tools</Texte>
        <Flex>
            <Button shape="icon" title="Insert text" onClick={() => addText(100, 100)}>
                <FaSolidA />
            </Button>
            <Button shape="icon" title="Insert circle" onClick={() => addCircle(100, 100)}>
                <FaRegularCircle />
            </Button>
            <Button shape="icon" title="Insert rectangle" onClick={() => addRectangle(100, 100)}>
                <FaRegularSquare />
            </Button>
            <Button shape="icon" title="Insert line">
                <FaSolidLinesLeaning />
            </Button>
        </Flex>
    </div>
}