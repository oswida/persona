import { Circle, Control, Group, Object, util, Text } from "fabric";
import { CounterMeta, appCanvas, appCounters } from "~/common";
import { setStrokeFillData } from "~/components/Dialog/StrokeFillDialog";

var cloneIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A"

export var cloneImg = document.createElement('img');
cloneImg.src = cloneIcon;

var plusIcon = "data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox =\"0 0 512 512\"><path d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z\"/></svg>"

export var plusImg = document.createElement('img');
plusImg.src = plusIcon;

var minusIcon = "data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z\"/></svg>"

export var minusImg = document.createElement('img');
minusImg.src = minusIcon;

var xmarkIcon = "data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z\"/></svg>"
export var xmarkImg = document.createElement('img');
xmarkImg.src = xmarkIcon;

var paletteIcon = "data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z\"/></svg>"
export var paletteImg = document.createElement('img');
paletteImg.src = paletteIcon;

function renderIcon(icon: any) {
    return function renderIcon(ctx: any, left: any, top: any, styleOverride: any, fabricObject: Object) {
        var size = 24;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(icon, -size / 2, -size / 2, size, size);
        ctx.restore();
    }
}

export const addControl = (name: string, obj: Object, x: number, y: number, ofx: number, ofy: number, mouseUp: () => void, icon: any) => {
    const newControls = { ...obj.controls };
    newControls[name] = new Control({
        actionName: name,
        x: x,
        y: y,
        offsetY: ofx,
        offsetX: ofy,
        sizeX: 24,
        sizeY: 24,
        cursorStyle: 'pointer',
        mouseUpHandler: mouseUp,
        render: renderIcon(icon),
    });
    obj.controls = newControls;
}

export const counterChange = (obj: Object, amount: number) => {
    const data = obj.get("data") as CounterMeta;
    if (!data) return;

    const counter = appCounters()[data.counterId];
    if (!counter) return;
    const t = data.titleRef as Text;
    const value = data.currentVal + amount;
    if (value < 0 || value > counter.maxval) return;
    data.currentVal = value;
    switch (counter.ctype) {
        case "clock":
            const o = data.counterRef;
            if (!o) return;
            const c = o as Circle;
            if (!c) return;
            c.set("endAngle", data.currentVal * (360 / counter.maxval) - 90);
            break;
        case "resource":
            const g = obj as Group;
            g.getObjects().forEach((ro) => {
                const id = ro.get("id") as string;
                const num = ro.get("data") as number;
                if (id != "title" && num !== undefined) {
                    if (num < data.currentVal) ro.fill = t.fill; else ro.fill = "transparent";
                }
            });
            break;
    }
    t.set("text", `${data.title} (${data.currentVal}/${counter.maxval})`);
}


export const canvasRemoveActive = () => {
    const cnv = appCanvas();
    if (!cnv) return;
    const obj = cnv.getActiveObject();
    if (!obj) return;
    cnv.remove(obj);
    cnv.requestRenderAll();
}

export const canvasChangeColors = () => {
    const cnv = appCanvas();
    if (!cnv) return;
    const obj = cnv.getActiveObject();
    if (!obj) return;
    const isText = obj.get("type") == "text" || obj.get("type") == "textbox";
    setStrokeFillData((prev) => ({
        open: true,
        stroke: isText ? obj.get("fill") : obj.get("stroke"),
        fill: isText ? "transparent" : obj.get("fill"),
        accept: (stroke: string, fill: string) => {
            if (isText) {
                obj.set("fill", stroke);
            } else {
                obj.set("stroke", stroke);
                obj.set("fill", fill);
            }
            cnv.requestRenderAll();
        }
    }))
}