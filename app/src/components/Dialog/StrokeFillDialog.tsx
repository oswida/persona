import { Component, createSignal, createUniqueId, createMemo, createEffect, Show, For } from "solid-js";
import { normalizeProps, useMachine } from "@zag-js/solid";
import * as dialog from "@zag-js/dialog";
import { Portal } from "solid-js/web";
import { Button } from "../Button";
import { Flex } from "../Flex";
import { Texte } from "../Texte";
import {
    DialogOverlayStyle, DialogContentStyle,
    DialogHeaderStyle, DialogCloseButtonStyle, DialogDescStyle
} from "./styles.css";
import { FaSolidPalette } from "solid-icons/fa";
import { drawColors } from "~/common";

export type StrokeFillState = {
    stroke: string;
    fill: string;
    accept: (stroke: string, fill: string) => void;
    open: boolean;
}

export const [strokeFillData, setStrokeFillData] = createSignal<StrokeFillState>({
    accept: (stroke: string, fill: string) => { },
    open: false,
    stroke: "#000000",
    fill: "transparent",
});

export const StrokeFillDialog: Component = () => {

    const [state, send] = useMachine(
        dialog.machine({
            id: createUniqueId(),
            onClose: () => {
                setStrokeFillData((prev) => ({ ...prev, open: false }));
            },
        })
    );
    const api = createMemo(() => dialog.connect(state, send, normalizeProps));

    createEffect(() => {
        if (strokeFillData().open) api().open();
        else api().close();
    });

    const accept = () => {
        strokeFillData().accept(strokeFillData().stroke, strokeFillData().fill);
    }

    return <Show when={api().isOpen}>
        <Portal mount={document.getElementById("main-div")!}>
            <div class={DialogOverlayStyle} {...api().backdropProps} />
            <div class={DialogContentStyle} {...api().containerProps}>
                <div {...api().contentProps}>
                    <div class={DialogHeaderStyle}>
                        <div {...api().titleProps}>Stroke & Fill Colors</div>
                        <button
                            class={DialogCloseButtonStyle}
                            {...api().closeTriggerProps}
                        >
                            ×
                        </button>
                    </div>
                    <div {...api().descriptionProps} class={DialogDescStyle}>
                        <Flex dn="column" gap="medium">
                            <Texte size="small">Stroke</Texte>
                            <Flex>
                                <For each={drawColors}>{
                                    (it) => <Button
                                        shape="icon"
                                        title="Stroke color"
                                        selected={() => strokeFillData().stroke == it}
                                        onClick={() => setStrokeFillData((prev) => ({ ...prev, stroke: it }))}
                                    >
                                        <FaSolidPalette color={it} />
                                    </Button>
                                }
                                </For>
                            </Flex>
                            <Texte size="small">Fill</Texte>
                            <Flex>
                                <For each={drawColors}>{
                                    (it) => <Button
                                        shape="icon"
                                        title="Fill color"
                                        selected={() => strokeFillData().fill == it}
                                        onClick={() => setStrokeFillData((prev) => ({ ...prev, fill: it }))}
                                    >
                                        <FaSolidPalette color={it} />
                                    </Button>
                                }
                                </For>
                            </Flex>
                        </Flex>
                        <Flex
                            center
                            style={{ padding: "5px", gap: "15px", "margin-top": "15px" }}
                        >
                            <Button onClick={() => api().close()}>Cancel</Button>
                            <Button
                                onClick={() => {
                                    api().close();
                                    accept();
                                }}
                            >
                                Accept
                            </Button>
                        </Flex>
                    </div>
                </div>
            </div>
        </Portal>
    </Show>
}