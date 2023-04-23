import { Accessor, Component, ParentComponent, Setter, Show, createSignal } from "solid-js"
import { FaSolidDeleteLeft, FaSolidPlus } from "solid-icons/fa";
import { Texte, Button, Accordion, AccordionDesc, Flex, Input } from "~/components";
import { listRootStyle, listCtrlRowStyle, listStyle } from "./styles.css";

type Props = {
    title: string;
    count: () => number;
    create: () => void;
    items: () => AccordionDesc[];
    applyFilter: (value: string) => void;
    actions?: any;
}

export const AccordionListView: Component<Props> = ({ title, count, create, items, applyFilter, actions }) => {
    let refFilter: HTMLInputElement;

    const clear = () => {
        if (!refFilter) return;
        applyFilter("");
        refFilter.value = "";
    };

    const doFilter = () => {
        if (!refFilter) return;
        applyFilter(refFilter.value.trim());
    };

    return <div class={listRootStyle}>
        <div class={listCtrlRowStyle}>
            <Texte size="bigger">{title} ({count()})</Texte>
            <Flex>
                <Show when={actions}>
                    {actions}
                </Show>
                <Button onClick={create} title="Add new" shape="icon">
                    <FaSolidPlus />
                </Button>
            </Flex>
        </div>
        <div class={listStyle}>
            <Accordion items={items} />
        </div>
        <Flex vcenter style={{ "justify-content": "flex-end" }}>
            <Texte>Filter: </Texte>
            <Input underline transparent ref={(e) => (refFilter = e)} onInput={doFilter} />
            <Button onClick={clear}>
                <FaSolidDeleteLeft />
            </Button>
        </Flex>
    </div>
}