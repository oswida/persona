import { Component } from "solid-js";
import { AssetData, appAssets, personaAssetsKey, saveToStorage, themeVars } from "~/common";
import { assetItemStyle } from "./styles.css";
import { Button, ConfirmState, Flex, StrInputState, Texte, setConfirmData, setStrInputData } from "~/components";
import { FaSolidPencil, FaSolidPlus, FaSolidTrash } from "solid-icons/fa";
import { addAsset } from "../WhiteboardView/assets";


type Props = {
    item: AssetData;
}

export const AssetItem: Component<Props> = ({ item }) => {

    const deleteAsset = () => {
        setConfirmData({
            open: true,
            title: "Delete asset",
            message: `Do you really want to delete ${item.name}?`,
            accept: () => {
                const vals = Object.values(appAssets()).filter((v) => v.id != item.id);
                const newState = { ...vals };
                saveToStorage(personaAssetsKey, newState);
            },
        } as ConfirmState);
    };

    const editName = () => {
        setStrInputData({
            open: true,
            title: "Edit name",
            message: "",
            value: item.name,
            accept: (value: string) => {
                const newState = {
                    ...appAssets(), [item.id]: {
                        ...appAssets()[item.id], name: value
                    }
                };
                saveToStorage(personaAssetsKey, newState);
            },
            multiline: false
        } as StrInputState);
    };

    const editScale = () => {
        setStrInputData({
            open: true,
            title: "Edit scale",
            message: "",
            value: item.scale.toString(),
            accept: (value: string) => {
                const num = Number.parseFloat(value);
                if (Number.isNaN(num)) return;
                const newState = {
                    ...appAssets(), [item.id]: {
                        ...appAssets()[item.id], scale: num
                    }
                };
                saveToStorage(personaAssetsKey, newState);
            },
            multiline: false
        } as StrInputState);
    };

    const editUri = () => {
        setStrInputData({
            open: true,
            title: "Edit URI",
            message: "",
            value: item.uri,
            accept: (value: string) => {
                const newState = {
                    ...appAssets(), [item.id]: {
                        ...appAssets()[item.id], uri: value
                    }
                };
                saveToStorage(personaAssetsKey, newState);
            },
            height: "4em",
            multiline: true
        } as StrInputState);
    };

    const insertAsset = () => {
        setStrInputData({
            open: true,
            title: "Add asset to table",
            message: "Input asset name",
            value: "name",
            accept: (value: string) => {
                addAsset(item.id, 100, 100, value);
            },
            width: "10em",
        } as StrInputState);
    }

    return <div class={assetItemStyle}>
        <Flex style={{ "justify-content": "space-between" }}>
            <Flex style={{ gap: "10px" }}>
                <Button onClick={deleteAsset} title="Delete asset" size="small">
                    <FaSolidTrash color={themeVars.color.secondary} />
                </Button>
            </Flex>
            <Flex>
                <Button size="small" onClick={editName}>
                    <FaSolidPencil color={themeVars.color.secondary} />
                    <Texte size="small">Name</Texte>
                </Button>
                <Button size="small" onClick={editUri}>
                    <FaSolidPencil color={themeVars.color.secondary} />
                    <Texte size="small">URI</Texte>
                </Button>
                <Button size="small" onClick={editScale}>
                    <FaSolidPencil color={themeVars.color.secondary} />
                    <Texte size="small">Scale</Texte>
                </Button>
                <Button size="small" shape="icon" onClick={insertAsset} title="Put on table">
                    <FaSolidPlus />
                </Button>
            </Flex>
        </Flex>
        <Texte size="small" style={{ padding: "10px", "overflow-wrap": "anywhere" }}>Scale: {item.scale}</Texte>
        <Texte size="small" style={{ padding: "10px", "overflow-wrap": "anywhere" }}>{item.uri}</Texte>
        <img src={item.uri} style={{ "max-width": "25vw", "align-self": "center" }} />
    </div>
}