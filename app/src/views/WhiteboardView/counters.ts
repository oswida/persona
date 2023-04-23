import { Group, Circle, Text } from "fabric";
import { appCanvas, appCounters, wbState, CounterMeta, commonCanvasObjectProps } from "~/common";
import { setStrokeFillData } from "~/components/Dialog/StrokeFillDialog";
import { addControl, counterChange, plusImg, minusImg, canvasRemoveActive, xmarkImg, paletteImg } from "./controls";
import { v4 as uuidv4 } from "uuid";

const counterChangeColors = () => {
    const cnv = appCanvas();
    if (!cnv) return;
    const obj = cnv.getActiveObject() as Group;
    if (!obj) return;
    setStrokeFillData((prev) => ({
        open: true,
        stroke: obj.get("stroke"),
        fill: obj.get("fill"),
        accept: (stroke: string, fill: string) => {
            const data = obj.get("data");
            switch (data.ctype) {
                case "clock":
                    const v = obj.getObjects().filter((it) => it.get("data") == "value-circle");
                    if (!v || v.length <= 0) return;
                    const b = obj.getObjects().filter((it) => it.get("data") == "border-circle");
                    if (!v || v.length <= 0) return;
                    v[0].set("stroke", fill);
                    b[0].set("stroke", stroke);
                    break;
                case "resource":
                    obj.getObjects().forEach((ro) => {
                        const id = ro.get("id") as string;
                        const num = ro.get("data") as number;
                        if (id != "title" && num !== undefined) {
                            if (num < data.currentVal) ro.set({
                                fill: stroke
                            }); else ro.set({
                                fill: "transparent"
                            });
                        } else {
                            ro.set({ fill: stroke });
                        }
                    });
                    break;
            }
            cnv.requestRenderAll();
        }
    }))
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
    addControl("color", grp, -0.5, -0.5, -16, -16, () => { counterChangeColors(); }, paletteImg);
    cnv.requestRenderAll();
    return grp;
}
