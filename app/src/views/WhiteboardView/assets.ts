import { Group, Image, Text } from "fabric";
import { appAssets, appCanvas, commonCanvasObjectProps, wbState } from "~/common";
import { addControl, canvasRemoveActive, xmarkImg } from "./controls";
import { v4 as uuidv4 } from "uuid";

export const addAsset = (id: string, x: number, y: number, title: string) => {
    const assets = appAssets();
    if (!assets) return undefined;
    const obj = assets[id];
    if (!obj) return undefined;
    Image.fromURL(obj.uri).then((img: any) => {
        const cnv = appCanvas();
        img.set({
            scaleX: obj.scale,
            scaleY: obj.scale
        })
        if (!cnv) return;
        const vpt = cnv.viewportTransform;
        const grp = new Group([img]);
        grp.set({
            left: x - vpt[4],
            top: y - vpt[5],
            data: uuidv4(),
            ...commonCanvasObjectProps
        });
        cnv.add(grp);
        const ttl = new Text(title, {
            left: grp.getX(),
            top: grp.getY() + grp.height,
            fontSize: 16,
            fill: wbState().stroke,
        });
        grp.add(ttl);
        addControl("del", grp, 0.5, -0.5, -16, 16, () => { canvasRemoveActive(); }, xmarkImg);
        cnv.requestRenderAll();
    }).catch((err) => {
        console.error(err);
    });
}

