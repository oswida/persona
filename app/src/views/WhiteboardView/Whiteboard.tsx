import { Canvas, Image } from "fabric";
import { Component, createEffect, createMemo, createSignal } from "solid-js";
import { appAssets, appCards, currentSession, sessionCards } from "~/common";
import { initEvents } from "./events";
import { createCardObject } from "./objects";


export const Whiteboard: Component = () => {
    const [cnv, setCnv] = createSignal<Canvas | undefined>(undefined);

    const bkg = createMemo(() => {
        const session = currentSession();
        if (!session || !session.backgroundImg || session.backgroundImg.trim() === "") return "";
        return appAssets()[session.backgroundImg].uri;
    });

    createEffect(() => {
        if (cnv() != undefined) return;
        const canvas = new Canvas("wboard", { width: 1920, height: 1080 });
        Image.fromURL(bkg()).then((img: any) => {
            canvas.backgroundImage = img;
            canvas.renderAll();
        }).catch((err) => {
            console.error(err);
        });
        initEvents(canvas);
        setCnv(canvas);
        // Object.prototype.transparentCorners = false;
        // Object.prototype.cornerStyle = "circle";
        // Object.prototype.borderColor = "white"; //currentTheme().color.secondary;
        // Object.prototype.cornerColor = "white"; //currentTheme().color.secondary;
        // Object.prototype.cornerSize = 6;
        // Object.prototype.padding = 10;
        // Object.prototype.borderDashArray = [5, 5];
    });

    createEffect(() => {
        const canvas = cnv();
        if (!canvas) return;
        let cards = Object.keys(appCards());
        const toRemove = canvas.getObjects().filter((it) => {
            return cards.includes(it.get('data'));
        });
        canvas.remove(...toRemove);
        cards = sessionCards();
        cards.forEach((it) => {
            const obj = createCardObject(it);
            if (obj) {
                canvas.add(obj);
            }
        });
        canvas.requestRenderAll();
    });

    return <canvas id="wboard"></canvas>
}