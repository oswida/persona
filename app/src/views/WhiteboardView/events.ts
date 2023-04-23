import { Canvas, Circle, Ellipse, Line, Point, Rect, Textbox, Triangle } from "fabric";
import { appCanvas, appSessions, commonCanvasObjectProps, currentSession, drawTool, personaSessionsKey, saveToStorage, wbState } from "~/common";
import { Accessor } from "solid-js";
import { StrInputState, setStrInputData } from "~/components";
import { v4 as uuidv4 } from "uuid";
import { addControl, canvasRemoveActive, xmarkImg } from "./controls";

let isDragging = false;
let isMouseDown = false;
let drawInstance: any;
let lastPosX = 0;
let lastPosY = 0;

export const saveTable = () => {
    const cnv = appCanvas();
    const sess = currentSession();
    if (!cnv || !sess) return;
    const newState = { ...appSessions() };
    const data = cnv.toJSON();
    newState.sessions[sess.id].tableData = data;
    saveToStorage(personaSessionsKey, newState);
    // TODO: publish ?
}


export const initEvents = (canvas: Accessor<Canvas | undefined>) => {
    const cnv = canvas();
    if (!cnv) return;
    cnv.on('mouse:wheel', function (opt) {
        const cnv = canvas();
        if (!cnv) return;
        var delta = opt.e.deltaY;
        var zoom = cnv.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        cnv.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY } as Point, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
    });
    cnv.on('mouse:dblclick', (opt) => {
        const cnv = canvas();
        if (!cnv) return;
        var vpt = cnv.viewportTransform;
        vpt[4] = 0;
        vpt[5] = 0;
        vpt[0] = 1.0;
        vpt[3] = 1.0;
        cnv.setViewportTransform(vpt);
        opt.e.preventDefault();
        opt.e.stopPropagation();
    })
    cnv.on('mouse:down', function (opt) {
        const cnv = canvas();
        if (!cnv) return;
        var evt = opt.e;
        if (evt.altKey === true || opt.button == 3) {
            isDragging = true;
            lastPosX = opt.absolutePointer.x;
            lastPosY = opt.absolutePointer.y;
            cnv.selection = false;
        } else {
            if (drawTool() !== "select") cnv.selection = false;
            isMouseDown = true;
            let pointer = cnv.getPointer(opt.e);
            lastPosX = pointer.x;
            lastPosY = pointer.y;
            switch (drawTool()) {
                case "line": {
                    drawInstance = new Line(
                        [pointer.x, pointer.y, pointer.x, pointer.y],
                        {
                            strokeWidth: wbState().width,
                            stroke: wbState().stroke,
                            selectable: false,
                        }
                    );
                }
                    break;
                case "rectangle": {
                    drawInstance = new Rect({
                        stroke: wbState().stroke,
                        strokeWidth: wbState().width,
                        fill: wbState().fill ? wbState().fill : "transparent",
                        left: pointer.x,
                        top: pointer.y,
                        width: 0,
                        height: 0,
                        selectable: false,
                    });
                }; break;
                case "circle": {
                    drawInstance = new Circle({
                        stroke: wbState().stroke,
                        strokeWidth: wbState().width,
                        fill: wbState().fill ? wbState().fill : "transparent",
                        left: pointer.x,
                        top: pointer.y,
                        selectable: false,
                    });
                } break;
                case "ellipse": {
                    drawInstance = new Ellipse({
                        stroke: wbState().stroke,
                        strokeWidth: wbState().width,
                        fill: wbState().fill ? wbState().fill : "transparent",
                        left: pointer.x,
                        top: pointer.y,
                        selectable: false,
                    });
                } break;
                case "triangle": {
                    drawInstance = new Triangle({
                        stroke: wbState().stroke,
                        strokeWidth: wbState().width,
                        fill: wbState().fill ? wbState().fill : "transparent",
                        left: pointer.x,
                        top: pointer.y,
                        width: 0,
                        height: 0,
                        selectable: false,
                    });
                } break;
                case "text": {
                    setStrInputData({
                        open: true,
                        title: "Add text",
                        message: "",
                        value: "some text",
                        accept: (value: string) => {
                            const cnv = canvas();
                            if (!cnv) return;
                            const txt = new Textbox(value, {
                                left: pointer.x,
                                top: pointer.y,
                                fill: wbState().stroke,
                                fontSize: 22,
                                ...commonCanvasObjectProps
                            });
                            cnv.add(txt);
                            addControl("del", txt, 0.5, -0.5, -16, 16,
                                () => { canvasRemoveActive(); }, xmarkImg);
                            cnv.requestRenderAll();
                        },
                        width: "20em",
                        height: "5em",
                        multiline: true
                    } as StrInputState);
                } break;
            }
            if (drawInstance) cnv.add(drawInstance);
            cnv.requestRenderAll();
        }
    });
    cnv.on('mouse:move', function (opt) {
        const cnv = canvas();
        if (!cnv) return;
        if (isDragging) {
            var e = opt.e;
            var vpt = cnv.viewportTransform;
            vpt[4] += opt.absolutePointer.x - lastPosX;
            vpt[5] += opt.absolutePointer.y - lastPosY;
            cnv.requestRenderAll();
            lastPosX = opt.absolutePointer.x;
            lastPosY = opt.absolutePointer.y;
        } else {
            if (isMouseDown) {
                const pointer = cnv.getPointer(opt.e);
                switch (drawTool()) {
                    case "line": {
                        drawInstance.set({
                            x2: pointer.x,
                            y2: pointer.y,
                        });
                    } break;
                    case "triangle":
                    case "rectangle": {
                        if (pointer.x < lastPosX) {
                            drawInstance.set("left", pointer.x);
                        }
                        if (pointer.y < lastPosY) {
                            drawInstance.set("top", pointer.y);
                        }
                        drawInstance.set({
                            width: Math.abs(pointer.x - lastPosX),
                            height: Math.abs(pointer.y - lastPosY),
                        });
                    } break;
                    case "circle": {
                        if (pointer.x < lastPosX) {
                            drawInstance.set("left", pointer.x);
                        }
                        if (pointer.y < lastPosY) {
                            drawInstance.set("top", pointer.y);
                        }
                        drawInstance.set({
                            radius: Math.round(Math.sqrt(Math.pow(Math.abs(pointer.x - lastPosX), 2) +
                                Math.pow(Math.abs(pointer.y - lastPosY), 2))) / 2,
                        });
                    } break;
                    case "ellipse": {
                        if (pointer.x < lastPosX) {
                            drawInstance.set("left", pointer.x);
                        }
                        if (pointer.y < lastPosY) {
                            drawInstance.set("top", pointer.y);
                        }
                        drawInstance.set({
                            rx: Math.abs(pointer.x - lastPosX) / 2,
                            ry: Math.abs(pointer.y - lastPosY) / 2,
                        });
                    } break;
                    case "text": {
                        drawInstance.set("left", pointer.x);
                        drawInstance.set("top", pointer.y);
                    } break;
                }
                if (drawInstance) drawInstance.setCoords();
                cnv.requestRenderAll();
            }
        }
    });
    cnv.on('mouse:up', function (opt) {
        const cnv = canvas();
        if (!cnv) return;
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        if (isDragging) {
            cnv.setViewportTransform(cnv.viewportTransform);
            isDragging = false;
            lastPosX = 0;
            lastPosY = 0;
        } else if (drawTool() === "eraser") {
            if (!canvas) return;
            const objs = cnv.getActiveObjects();
            objs.forEach((it) => {
                cnv.remove(it);
            });
            cnv.requestRenderAll();
        }
        else {
            isMouseDown = false;
            lastPosX = 0;
            lastPosY = 0;
            if (drawInstance) {
                drawInstance.set({
                    ...commonCanvasObjectProps
                });
                addControl("del", drawInstance, 0.5, -0.5, -16, 16,
                    () => { canvasRemoveActive(); }, xmarkImg);
                drawInstance = undefined;
            }
        }
        cnv.selection = true;
    });
    cnv.on("object:added", (opt) => {
        if (opt.target.type === "path") {
            opt.target.set({
                data: uuidv4(),
                ...commonCanvasObjectProps
            });
            addControl("del", opt.target as any, 0.5, -0.5, -16, 16,
                () => { canvasRemoveActive(); }, xmarkImg);
        }
        saveTable();
    });
    cnv.on("object:modified", function (opt) {
        saveTable();
    });
    cnv.on("object:removed", function (opt) {
        saveTable();
    });
}