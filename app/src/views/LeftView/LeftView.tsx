import { Button } from "~/components"
import { leftViewIconsStyle, leftViewRootStyle } from "./styles.css"
import { FaSolidClock, FaSolidIdCard, FaSolidImage, FaSolidPaintbrush } from "solid-icons/fa"
import { leftViewType, selectedLeftView, setSelectedLeftView } from "~/common"
import { Component, Show } from "solid-js"
import { CardView } from "../CardView"
import { AssetView } from "../AssetView/AssetView"
import { DrawView } from "../DrawView"
import { Canvas } from "fabric"
import { CounterView } from "../CounterView"


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
            <CardView />
        </Show>
        <Show when={selectedLeftView() === "assets"}>
            <AssetView />
        </Show>
        <Show when={selectedLeftView() === "draw"}>
            <DrawView />
        </Show>
        <Show when={selectedLeftView() === "counters"}>
            <CounterView />
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
                onClick={() => activateView("counters")}
                selected={() => { return selectedLeftView() === "counters" }}
                shape="icon"
            >
                <FaSolidClock />
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