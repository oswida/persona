import { Canvas, Group, Text } from "fabric";
import { appCards, sessionCards } from "~/common";

export const createCardObject = (id: string) => {
    const cards = appCards();
    const obj = cards[id];
    if (!obj) return undefined;
    const group = new Group();
    const title = new Text(obj.title, {
        left: 100,
        top: 100,
    });
    group.add(title);
    group.set('data', id);
    return group;
}