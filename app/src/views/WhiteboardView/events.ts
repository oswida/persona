import { Canvas, Point } from "fabric";

let isDragging = false;
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
        if (evt.altKey === true) {
            isDragging = true;
            canvas.selection = false;
            lastPosX = opt.absolutePointer.x;
            lastPosY = opt.absolutePointer.y;
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
        }
    });
    canvas.on('mouse:up', function (opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        canvas.setViewportTransform(canvas.viewportTransform);
        isDragging = false;
        canvas.selection = true;
    });
}