import { Component, createMemo, createSignal } from "solid-js";
import { assetCtrlRowStyle, assetListStyle, assetRootStyle } from "./styles.css";
import { Accordion, AccordionDesc, Button, Checkbox, Flex, Input, Texte } from "~/components";
import { AssetType, appAssets, personaAssetsKey, setAppStore } from "~/common";
import { FaSolidDeleteLeft, FaSolidPlus } from "solid-icons/fa";
import { AssetItem } from "./AssetItem";
import { v4 as uuidv4 } from "uuid";

export const AssetView: Component = () => {
    const [filter, setFilter] = createSignal("");
    let refFlt: HTMLInputElement;

    const assetCount = createMemo(() => {
        return Object.keys(appAssets()).length;
    });

    const create = () => {
        const newState = { ...appAssets() };
        const id = uuidv4();
        newState[id] = {
            id: id,
            name: "asset",
            uri: ""
        } as AssetType;
        setAppStore(personaAssetsKey, newState);
    }

    const items = createMemo(() => {
        return Object.values(appAssets())
            .filter((it) => filter() == "" || it.name.includes(filter()))
            //   .filter((it) => !onlySession() || sessionCards().includes(it.id))
            //   .filter(
            //     (it) => !onlyOwner() || appSettings().ident.browserID == it.owner
            //   )
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((it) => {
                return {
                    title: <Texte weight={700}>{it.name}</Texte>,
                    value: it.id,
                    content: <AssetItem item={it} />,
                } as AccordionDesc;
            });
    });

    const clear = () => {
        if (!refFlt) return;
        setFilter("");
        refFlt.value = "";
    };

    const flt = () => {
        if (!refFlt) return;
        setFilter(refFlt.value.trim());
    };


    return <div class={assetRootStyle}>
        <div class={assetCtrlRowStyle}>
            <Texte size="bigger">Assets ({assetCount()})</Texte>
            <Button onClick={create} title="Add new asset">
                <FaSolidPlus />
            </Button>
        </div>
        <div class={assetListStyle}>
            <Accordion items={items} />
        </div>
        <Flex vcenter style={{ "justify-content": "flex-end" }}>
            <Texte>Filter: </Texte>
            <Input underline transparent ref={(e) => (refFlt = e)} onInput={flt} />
            <Button onClick={clear}>
                <FaSolidDeleteLeft />
            </Button>
        </Flex>
    </div>
}