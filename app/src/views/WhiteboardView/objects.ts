import { Canvas, Group, Rect, Text, Textbox, Image } from "fabric";
import { appAssets, appCards } from "~/common";

export const commonProps = {
    cornerStyle: "circle",
    cornerColor: "grey",
    borderColor: "grey",
    borderDashArray: [5, 5],
    cornerSize: 6,
    padding: 5
}

const textPadding = 5;

export const createCardObject = (id: string, x: number, y: number) => {
    const cards = appCards();
    const obj = cards[id];
    if (!obj) return undefined;

    const title = new Text(obj.title, {
        left: x + textPadding,
        top: y + textPadding,
        fontSize: 16,
        fontWeight: "bold"
    });
    const content = new Textbox(obj.content, {
        left: x + textPadding,
        top: y + 24 + textPadding,
        fontSize: 16,
    });
    const group = new Group([title, content]);
    group.set({ ...commonProps, backgroundColor: "white", shadow: 'rgba(0,0,0,0.4) 5px 5px 7px', data: id });
    const brd = new Rect({
        left: x,
        top: y,
        width: group.get('width') + 2 * +textPadding,
        height: group.get('height') + 2 * +textPadding,
        stroke: "grey",
        fill: "transparent"
    });
    group.add(brd);
    return group;
}

export const createAssetObject = (canvas: Canvas, id: string, x: number, y: number) => {
    const assets = appAssets();
    if (!assets) return undefined;
    const obj = assets[id];
    if (!obj) return undefined;
    Image.fromURL(obj.uri).then((img: any) => {
        img.set({
            left: x,
            top: y,
            data: id,
        });
        canvas.add(img);
    }).catch((err) => {
        console.error(err);
    });
}