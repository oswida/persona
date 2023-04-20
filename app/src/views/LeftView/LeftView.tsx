import { Button } from "~/components"
import { leftViewIconsStyle, leftViewRootStyle } from "./styles.css"
import { FaSolidIdCard, FaSolidImage, FaSolidPaintbrush } from "solid-icons/fa"
import { leftViewType, selectedLeftView, setSelectedLeftView } from "~/common"
import { Component, Show } from "solid-js"
import { CardList } from "../CardView"
import { AssetView } from "../AssetView/AssetView"
import { DrawView } from "../DrawView"
import { Canvas } from "fabric"


export const LeftView: Component = () => {
    const activateView = (v: leftViewType) => {
        if (v === selectedLeftView()) {
            setSelectedLeftView("none");
            return;
        }
        setSelectedLeftView(v);
    }


    return <div class={leftViewRootStyle}>
        <Show when={selectedLeftView() === "cards"}>
            <CardList />
        </Show>
        <Show when={selectedLeftView() === "assets"}>
            <AssetView />
        </Show>
        <Show when={selectedLeftView() === "draw"}>
            <DrawView />
        </Show>
        <div class={leftViewIconsStyle}>
            <Button
                onClick={() => activateView("cards")}
                selected={() => { return selectedLeftView() === "cards" }}
                shape="icon"
            >
                <FaSolidIdCard />
            </Button>
            <Button
                onClick={() => activateView("assets")}
                selected={() => { return selectedLeftView() === "assets" }}
                shape="icon"
            >
                <FaSolidImage />
            </Button>
            <Button
                onClick={() => activateView("draw")}
                selected={() => { return selectedLeftView() === "draw" }}
                shape="icon"
            >
                <FaSolidPaintbrush />
            </Button>
        </div>
    </div>
}