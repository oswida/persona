import { Button, TabDesc, Tabs } from "~/components"
import { ChatView } from "../ChatView";
import { rightViewIconsStyle, rightViewRootStyle } from "./styles.css";
import { chatVisible, rightViewType, selectedRightView, setChatVisible, setSelectedRightView } from "~/common";
import { FaSolidDice, FaSolidGears, FaSolidHourglass, FaSolidMessage } from "solid-icons/fa";
import { Show } from "solid-js";
import { SettingsView } from "../SettingsView";
import { SessionView } from "../SessionView";
import { DiceRollerView } from "../DiceRollerView";

const activateView = (v: rightViewType) => {
    if (v === selectedRightView()) {
        setSelectedRightView("none");
        return;
    }
    setSelectedRightView(v);
}

export const RightView = () => {
    return <div class={rightViewRootStyle}>
        <div class={rightViewIconsStyle}>
            <Button
                onClick={() => activateView("chat")}
                selected={() => { return selectedRightView() === "chat" }}
                shape="icon"
            >
                <FaSolidMessage />
            </Button>
            <Button
                onClick={() => activateView("settings")}
                selected={() => { return selectedRightView() === "settings" }}
                shape="icon"
            >
                <FaSolidGears />
            </Button>
            <Button
                onClick={() => activateView("session")}
                selected={() => { return selectedRightView() === "session" }}
                shape="icon"
            >
                <FaSolidHourglass />
            </Button>
            <Button
                onClick={() => activateView("dice")}
                selected={() => { return selectedRightView() === "dice" }}
                shape="icon"
            >
                <FaSolidDice />
            </Button>
        </div>
        <Show when={selectedRightView() === "chat"}>
            <ChatView />
        </Show>
        <Show when={selectedRightView() === "settings"}>
            <SettingsView />
        </Show>
        <Show when={selectedRightView() === "session"}>
            <SessionView />
        </Show>
        <Show when={selectedRightView() === "dice"}>
            <DiceRollerView />
        </Show>
    </div>

}