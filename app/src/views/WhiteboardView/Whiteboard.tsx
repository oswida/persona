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
        console.log(assets, session?.backgroundImg, assets[session?.backgroundImg]);
        if (assets[session.backgroundImg] === undefined || !session.backgroundImg || session.backgroundImg.trim() === "") return "";
        return assets[session.backgroundImg].uri;
    });

    createEffect(() => {
        if (cnv() != undefined) return;
        const canvas = new Canvas("wboard", { width: 1920, height: 1080 });
        Image.fromURL(bkg()).then((img: any) => {
            canvas.backgroundImage = img;
            canvas.renderAll();
            console.log(img, bkg());
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
        cards = sessionCards();
        if (!cards) return;
        let x = 100;
        let y = 100;
        cards.forEach((it) => {
            const obj = createCardObject(it, x, y);
            if (obj) {
                canvas.add(obj);
                x += 16;
                y += 16;
            }
        });
        canvas.requestRenderAll();
        const assets = sessionAssets();
        if (!assets) return;
        x = 300;
        y = 300;
        cards.forEach((it) => {
            createAssetObject(canvas, it, x, y);
            x += 16;
            y += 16;
        });
        canvas.requestRenderAll();
    });

    return <div class={WhiteboardRootStyle}><canvas id="wboard"></canvas></div>
}