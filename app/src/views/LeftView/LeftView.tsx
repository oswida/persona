import { Button } from "~/components"
import { leftViewIconsStyle, leftViewRootStyle } from "./styles.css"
import { FaSolidIdCard } from "solid-icons/fa"
import { leftViewType, selectedLeftView, setSelectedLeftView } from "~/common"
import { Show } from "solid-js"
import { CardList } from "../CardView"

export const LeftView = () => {
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
        <div class={leftViewIconsStyle}>
            <Button
                onClick={() => activateView("cards")}
                selected={() => { return selectedLeftView() === "cards" }}
                shape="icon"
            >
                <FaSolidIdCard />
            </Button>
        </div>
    </div>
}