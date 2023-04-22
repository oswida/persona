import { Canvas, Image, PencilBrush } from "fabric";
import { Component, createEffect, createMemo } from "solid-js";
import { appAssets, appCanvas, currentSession, drawTool, setAppCanvas, wbState } from "~/common";
import { initEvents } from "./events";
import { WhiteboardRootStyle } from "./styles.css";


export const Whiteboard: Component = () => {

    const bkg = createMemo(() => {
        const assets = appAssets();
        const session = currentSession();
        if (!assets || !session) return "";
        if (assets[session.backgroundImg] === undefined || !session.backgroundImg || session.backgroundImg.trim() === "") return "";
        return assets[session.backgroundImg].uri;
    });

    createEffect(() => {
        const canvas = new Canvas("wboard", {
            width: 1920, height: 1080,
            fireRightClick: true,
            fireMiddleClick: true,
            stopContextMenu: true
        });
        setAppCanvas(canvas);
    });

    createEffect(() => {
        const b = bkg();
        if (!b || b.trim() === "") return;
        const cnv = appCanvas();
        if (!cnv) return;
        Image.fromURL(b).then((img: any) => {
            cnv.backgroundImage = img;
            cnv.requestRenderAll();
        }).catch((err) => {
            console.error(err);
        });
    });

    createEffect(() => {
        initEvents(appCanvas);
    });

    createEffect(() => {
        const cnv = appCanvas();
        if (!cnv) return;
        if (drawTool() === "freedraw") {
            cnv.freeDrawingBrush = new PencilBrush(cnv);
            cnv.freeDrawingBrush.width = wbState().width;
            cnv.isDrawingMode = true;
            cnv.freeDrawingBrush.color = wbState().stroke;
        } else {
            cnv.isDrawingMode = false;
        }
    });

    // createEffect(() => {
    //     const canvas = appCanvas();
    //     if (!canvas) return;
    //     let cards = Object.keys(appCards());
    //     const toRemove = canvas.getObjects().filter((it) => {
    //         const c = appCards()[it.get('data')];
    //         return cards.includes(it.get('data')) && (c.isPublic || c.owner == appSettings().ident.browserID);
    //     });
    //     canvas.remove(...toRemove);
    //     Object.entries(sessionCards()).forEach(([k, it]) => {
    //         const obj = createCardObject(k, it.x, it.y, it.angle);
    //         if (obj) {
    //             canvas.add(obj);
    //         }
    //     });
    //     canvas.requestRenderAll();
    //     let ase = Object.keys(appAssets());
    //     const toRemoveAse = canvas.getObjects().filter((it) => {
    //         const c = appAssets()[it.get('data')];
    //         return ase.includes(it.get('data'));
    //     });
    //     canvas.remove(...toRemoveAse);
    //     const assets = sessionAssets();
    //     if (!assets) return;
    //     Object.entries(sessionAssets()).forEach(([k, it]) => {
    //         createAssetObject(canvas, k, it.x, it.y, it.angle);
    //     });
    //     canvas.requestRenderAll();
    // });

    return <div class={WhiteboardRootStyle}><canvas id="wboard"></canvas></div>
}