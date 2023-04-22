import { Canvas, Circle, Rect, Text, Textbox, Image, Group } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { appAssets, appCanvas, appCards, commonCanvasObjectProps, wbState } from "~/common";


// shadow: 'rgba(0,0,0,0.4) 5px 5px 7px',

export const addText = (x: number, y: number, data?: string) => {
    const canvas = appCanvas();
    if (!canvas) return;
    const vpt = canvas.viewportTransform;
    const result = new Textbox(data ? data : "text", {
        left: x - vpt[4],
        top: y - vpt[5],
        fill: wbState().stroke,
        fontSize: 22,
        data: uuidv4(),
        ...commonCanvasObjectProps
    });
    canvas.add(result);
    canvas.requestRenderAll();
    return result;
}


export type DrawShapeType = "circle" | "rectangle" | "triangle" | "ellipse";

export const addShape = (shape: DrawShapeType, x: number, y: number) => {
    const canvas = appCanvas();
    if (!canvas) return;
    const vpt = canvas.viewportTransform;
    let result = undefined;
    switch (shape) {
        case "circle":
            result = new Circle({
                left: x - vpt[4],
                top: y - vpt[5],
                fill: wbState().fill,
                stroke: wbState().stroke,
                strokeWidth: wbState().width,
                radius: 20,
                data: uuidv4(),
                ...commonCanvasObjectProps
            });
            break;
        case "rectangle":
            result = new Rect({
                left: x - vpt[4],
                top: y - vpt[5],
                fill: wbState().fill,
                stroke: wbState().stroke,
                strokeWidth: wbState().width,
                width: 20,
                height: 20,
                data: uuidv4(),
                ...commonCanvasObjectProps
            });
            break;
    }
    if (result) {
        canvas.add(result);
        canvas.requestRenderAll();
    }
    return result;
}

export const addAsset = (id: string, x: number, y: number, title: string) => {
    const assets = appAssets();
    if (!assets) return undefined;
    const obj = assets[id];
    if (!obj) return undefined;
    Image.fromURL(obj.uri).then((img: any) => {
        const cnv = appCanvas();
        if (!cnv) return;
        const vpt = cnv.viewportTransform;
        const grp = new Group([img]);
        grp.set({
            left: x - vpt[4],
            top: y - vpt[5],
            data: uuidv4(),
            ...commonCanvasObjectProps
        });
        cnv.add(grp);
        const ttl = new Text(title, {
            left: grp.getX(),
            top: grp.getY() + grp.height,
            fontSize: 16,
            fill: wbState().stroke,
        });
        grp.add(ttl);
        cnv.requestRenderAll();
    }).catch((err) => {
        console.error(err);
    });
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
    });
    const content = new Text(obj.content, {
        left: x + textPadding,
        top: y + 24 + textPadding,
        fill: wbState().stroke,
        fontSize: 16,
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
    });
    group.add(brd);
    cnv.add(group);
    cnv.requestRenderAll();
    return group;
}
