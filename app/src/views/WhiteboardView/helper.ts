import { Circle, Rect, Text, Textbox, Image, Group, Control, util, Object } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { CounterMeta, appAssets, appCanvas, appCards, appCounters, commonCanvasObjectProps, wbState } from "~/common";
import { addControl, cloneImg, counterChange, canvasRemoveActive, minusImg, plusImg, xmarkImg } from "./controls";

export const addAsset = (id: string, x: number, y: number, title: string) => {
    const assets = appAssets();
    if (!assets) return undefined;
    const obj = assets[id];
    if (!obj) return undefined;
    Image.fromURL(obj.uri).then((img: any) => {
        const cnv = appCanvas();
        img.set({
            scaleX: obj.scale,
            scaleY: obj.scale
        })
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
        addControl("del", grp, 0.5, -0.5, -16, 16, () => { canvasRemoveActive(); }, xmarkImg);
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
    addControl("del", group, 0.5, -0.5, -16, 16, () => { canvasRemoveActive(); }, xmarkImg);
    cnv.add(group);
    cnv.requestRenderAll();
    return group;
}

export const addCounter = (id: string, x: number, y: number, ttl?: string) => {
    const counters = appCounters();
    const cnv = appCanvas();
    const obj = counters[id];
    if (!counters || !cnv || !obj) return;
    const vpt = cnv.viewportTransform;
    const title = new Text(`${ttl ? ttl : obj.title} (0/${obj.maxval})`, {
        left: x - vpt[4],
        top: y - vpt[5],
        fontSize: 16,
        fill: wbState().stroke,
        id: "title",
    })
    const grp = new Group([title]);
    grp.set({
        data: {
            id: uuidv4(),
            counterId: id,
            currentVal: 0,
            maxVal: obj.maxval,
            ctype: obj.ctype,
            titleRef: title,
            counterRef: undefined,
            title: ttl ? ttl : obj.title
        } as CounterMeta,
        ...commonCanvasObjectProps
    });
    cnv.add(grp);
    const gy = grp.getY() + grp.height;
    const gx = grp.getX();
    switch (obj.ctype) {
        case "clock":
            const c = new Circle({
                top: gy,
                left: gx,
                radius: 32,
                fill: "transparent",
                stroke: wbState().stroke,
                strokeWidth: 64,
                startAngle: -90,
                endAngle: -90,
                data: "value-circle"
            });
            const c2 = new Circle({
                top: gy,
                left: gx,
                radius: 64,
                stroke: wbState().stroke,
                fill: "transparent",
                data: "border-circle"
            });
            grp.add(c);
            grp.add(c2);
            grp.get("data").counterRef = c;
            break;
        case "resource":
            for (let i = 0; i < obj.maxval; i++) {
                const c = new Circle({
                    top: gy + 8,
                    left: gx + i * 20,
                    radius: 8,
                    stroke: wbState().stroke,
                    fill: "transparent",
                    data: i,
                    id: `value_${i}`
                });
                grp.add(c);
            }
            break;
    }
    addControl("inc", grp, 0.5, 0.5, -16, 16, () => { counterChange(grp, 1); cnv.requestRenderAll(); }, plusImg);
    addControl("dec", grp, -0.5, 0.5, -16, -16, () => { counterChange(grp, -1); cnv.requestRenderAll(); }, minusImg);
    addControl("del", grp, 0.5, -0.5, -16, 16, () => { canvasRemoveActive(); }, xmarkImg);
    cnv.requestRenderAll();
    return grp;
}

