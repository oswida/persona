import { Component, createMemo, createSignal } from "solid-js";
import { AccordionDesc, StrInputState, Texte, setStrInputData } from "~/components";
import { appAssets, personaAssetsKey, setAppStore } from "~/common";
import { AssetItem } from "./AssetItem";
import { v4 as uuidv4 } from "uuid";
import { AccordionListView } from "../AccordionListView";

export const AssetView: Component = () => {
    const [filter, setFilter] = createSignal("");

    const assetCount = createMemo(() => {
        return Object.keys(appAssets()).length;
    });

    const create = () => {
        setStrInputData({
            open: true,
            title: "Create asset",
            message: "Input asset name",
            value: "asset",
            accept: (value: string) => {
                const id = uuidv4();
                const newState = {
                    ...appAssets(), [id]: {
                        id: id,
                        name: value,
                        uri: "",
                        scale: 1,
                    }
                };
                setAppStore(personaAssetsKey, newState);
            },
            width: "15em",
        } as StrInputState);
    }

    const items = createMemo(() => {
        return Object.values(appAssets())
            .filter((it) => filter() == "" || it.name.toLowerCase().includes(filter().toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((it) => {
                return {
                    title: <Texte weight={700}>{it.name}</Texte>,
                    value: it.id,
                    content: <AssetItem item={it} />,
                } as AccordionDesc;
            });
    });


    return <AccordionListView
        title="Assets"
        count={assetCount}
        create={create}
        items={items}
        applyFilter={(value: string) => setFilter(value)}
    />

}