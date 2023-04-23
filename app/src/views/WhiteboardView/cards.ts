import { Group, Rect, Text } from "fabric";
import { appCards, appCanvas, wbState, commonCanvasObjectProps } from "~/common";
import { addControl, canvasRemoveActive, paletteImg, xmarkImg } from "./controls";
import { v4 as uuidv4 } from "uuid";
import { setStrokeFillData } from "~/components/Dialog/StrokeFillDialog";

const cardChangeColors = () => {
    const cnv = appCanvas();
    if (!cnv) return;
    const obj = cnv.getActiveObject() as Group;
    if (!obj) return;
    const str = obj.getObjects().filter((it) => it.get("data") == "border");
    setStrokeFillData((prev) => ({
        open: true,
        stroke: str[0].get("stroke"),
        fill: obj.get("backgroundColor"),
        accept: (stroke: string, fill: string) => {
            obj.set("backgroundColor", fill);
            str[0].set("stroke", stroke);
            const ttl = obj.getObjects().filter((it) => it.get("data") == "title");
            ttl[0].set("fill", stroke);
            const cnt = obj.getObjects().filter((it) => it.get("data") == "content");
            cnt[0].set("fill", stroke);
            cnv.requestRenderAll();
        }
    }));
}


export const addCard = (id: string, x: number, y: number) => {
    const textPadding = 5;
    const cards = appCards();
    const obj = cards[id];
    if (!obj) return undefined;
    const cnv = appCanvas();
    if (!cnv) return;
    const vpt = cnv.viewportTransform;
    const title = new Text(obj.title, {
        left: x + textPadding,
        top: y + textPadding,
        fill: wbState().stroke,
        fontSize: 16,
        fontWeight: "bold",
        data: "title"
    });
    const content = new Text(obj.content, {
        left: x + textPadding,
        top: y + 24 + textPadding,
        fill: wbState().stroke,
        fontSize: 16,
        data: "content"
    });
    const group = new Group([title, content]);
    group.set({
        ...commonCanvasObjectProps,
        backgroundColor: wbState().fill,
        shadow: 'rgba(0,0,0,0.4) 5px 5px 7px',
        data: uuidv4(),
    });
    const brd = new Rect({
        left: x - vpt[4],
        top: y - vpt[5],
        width: group.get('width') + 2 * +textPadding,
        height: group.get('height') + 2 * +textPadding,
        stroke: wbState().stroke,
        fill: "transparent",
        data: "border"
    });
    group.add(brd);
    addControl("del", group, 0.5, -0.5, -16, 16, () => { canvasRemoveActive(); }, xmarkImg);
    addControl("color", group, -0.5, -0.5, -16, -16, () => { cardChangeColors(); }, paletteImg);
    cnv.add(group);
    cnv.requestRenderAll();
    return group;
}

