import { Canvas, Circle, Rect, Text, Textbox } from "fabric";
import { v4 as uuidv4 } from "uuid";
import { appCanvas, commonCanvasObjectProps, wbState } from "~/common";


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