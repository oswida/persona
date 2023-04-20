import { Canvas, Image } from "fabric";
import { Component, createEffect, createMemo, createSignal } from "solid-js";
import { appAssets, appCards, appSettings, currentSession, sessionAssets, sessionCards } from "~/common";
import { initEvents } from "./events";
import { createAssetObject, createCardObject } from "./objects";
import { WhiteboardRootStyle } from "./styles.css";


export const Whiteboard: Component = () => {
    const [cnv, setCnv] = createSignal<Canvas | undefined>(undefined);

    const bkg = createMemo(() => {
        const assets = appAssets();
        const session = currentSession();
        if (!assets || !session) return "";
        if (assets[session.backgroundImg] === undefined || !session.backgroundImg || session.backgroundImg.trim() === "") return "";
        return assets[session.backgroundImg].uri;
    });

    createEffect(() => {
        if (cnv() != undefined) return;
        const canvas = new Canvas("wboard", {
            width: 1920, height: 1080,
            fireRightClick: true,
            fireMiddleClick: true,
            stopContextMenu: true
        });
        Image.fromURL(bkg()).then((img: any) => {
            canvas.backgroundImage = img;
            canvas.renderAll();
        }).catch((err) => {
            console.error(err);
        });
        initEvents(canvas);
        setCnv(canvas);

    });

    createEffect(() => {
        const canvas = cnv();
        if (!canvas) return;
        let cards = Object.keys(appCards());
        const toRemove = canvas.getObjects().filter((it) => {
            const c = appCards()[it.get('data')];
            return cards.includes(it.get('data')) && (c.isPublic || c.owner == appSettings().ident.browserID);
        });
        canvas.remove(...toRemove);
        Object.entries(sessionCards()).forEach(([k, it]) => {
            const obj = createCardObject(k, it.x, it.y, it.angle);
            if (obj) {
                canvas.add(obj);
            }
        });
        canvas.requestRenderAll();
        let ase = Object.keys(appAssets());
        const toRemoveAse = canvas.getObjects().filter((it) => {
            const c = appAssets()[it.get('data')];
            return ase.includes(it.get('data'));
        });
        canvas.remove(...toRemoveAse);
        const assets = sessionAssets();
        if (!assets) return;
        Object.entries(sessionAssets()).forEach(([k, it]) => {
            createAssetObject(canvas, k, it.x, it.y, it.angle);
        });
        canvas.requestRenderAll();
    });

    return <div class={WhiteboardRootStyle}><canvas id="wboard"></canvas></div>
}