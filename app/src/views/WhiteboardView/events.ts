import { Canvas, Circle, Ellipse, Line, Point, Rect, Textbox } from "fabric";
import { appCards, appSessions, commonCanvasObjectProps, drawTool, personaSessionsKey, saveToStorage, sessionAssets, sessionCards, wbState } from "~/common";
import { addShape, addText } from "./helper";

let isDragging = false;
let isMouseDown = false;
let drawInstance: any;
let lastPosX = 0;
let lastPosY = 0;

export const initEvents = (canvas: Canvas) => {
    canvas.on('mouse:wheel', function (opt) {
        var delta = opt.e.deltaY;
        var zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY } as Point, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
    });
    canvas.on('mouse:dblclick', (opt) => {
        var vpt = canvas.viewportTransform;
        vpt[4] = 0;
        vpt[5] = 0;
        vpt[0] = 1.0;
        vpt[3] = 1.0;
        canvas.setViewportTransform(vpt);
        opt.e.preventDefault();
        opt.e.stopPropagation();
    })
    canvas.on('mouse:down', function (opt) {
        var evt = opt.e;
        if (evt.altKey === true || opt.button == 3) {
            isDragging = true;
            canvas.selection = false;
            lastPosX = opt.absolutePointer.x;
            lastPosY = opt.absolutePointer.y;
        } else {
            isMouseDown = true;
            canvas.selection = false;
            let pointer = canvas.getPointer(opt.e);
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
                case "triangle": { } break;
                case "text": {
                    drawInstance = new Textbox("text", {
                        left: pointer.x,
                        top: pointer.y,
                        fill: wbState().stroke,
                        fontSize: 22,
                        selectable: false
                    });
                } break;
            }
            canvas.add(drawInstance);
            canvas.requestRenderAll();
        }
    });
    canvas.on('mouse:move', function (opt) {
        if (isDragging) {
            var e = opt.e;
            var vpt = canvas.viewportTransform;
            vpt[4] += opt.absolutePointer.x - lastPosX;
            vpt[5] += opt.absolutePointer.y - lastPosY;
            canvas.requestRenderAll();
            lastPosX = opt.absolutePointer.x;
            lastPosY = opt.absolutePointer.y;
        } else {
            if (isMouseDown) {
                const pointer = canvas.getPointer(opt.e);
                switch (drawTool()) {
                    case "line": {
                        drawInstance.set({
                            x2: pointer.x,
                            y2: pointer.y,
                        });
                    } break;
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
                    case "triangle": { } break;
                    case "text": {
                        drawInstance.set("left", pointer.x);
                        drawInstance.set("top", pointer.y);
                    } break;
                }
                drawInstance.setCoords();
                canvas.requestRenderAll();
            }
        }
    });
    canvas.on('mouse:up', function (opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        if (isDragging) {
            canvas.setViewportTransform(canvas.viewportTransform);
            isDragging = false;
            canvas.selection = true;
            lastPosX = 0;
            lastPosY = 0;
        }
        else if (drawTool() === "eraser") {
            const objs = canvas.getActiveObjects();
            objs.forEach((it) => {
                canvas.remove(it);
            });
        }
        else {
            isMouseDown = false;
            canvas.selection = true;
            lastPosX = 0;
            lastPosY = 0;
            drawInstance.set({
                ...commonCanvasObjectProps
            })
        }
    });
    canvas.on("object:modified", function (opt) {
        const id = opt.target.get("data");
        if (!id || id == "") return;
        let otype = "card";
        let obj = sessionCards()[id];
        if (!obj) {
            obj = sessionAssets()[id];
            otype = "asset";
        }
        if (!obj) return;
        switch (otype) {
            case "card":
                {
                    const newState = { ...appSessions() };
                    newState.sessions[newState.current].cards[id].x = opt.target.left;
                    newState.sessions[newState.current].cards[id].y = opt.target.top;
                    newState.sessions[newState.current].cards[id].angle = opt.target.angle;
                    saveToStorage(personaSessionsKey, newState);
                }
                break;
            case "asset":
                {
                    const newState = { ...appSessions() };
                    newState.sessions[newState.current].assets[id].x = opt.target.left;
                    newState.sessions[newState.current].assets[id].y = opt.target.top;
                    newState.sessions[newState.current].assets[id].angle = opt.target.angle;
                    saveToStorage(personaSessionsKey, newState);
                }
                break;
        }

    });
}