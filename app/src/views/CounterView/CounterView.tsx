import { Component, createMemo, createSignal } from "solid-js";
import { counterCtrlRowStyle, counterListStyle, counterRootStyle } from "./styles.css";
import { Accordion, AccordionDesc, Button, Flex, Input, StrInputState, Texte, setStrInputData } from "~/components";
import { FaSolidBox, FaSolidBoxesPacking, FaSolidClock, FaSolidCommentDots, FaSolidDeleteLeft, FaSolidEllipsis, FaSolidPlus } from "solid-icons/fa";
import { CounterData, appCounters, appSettings, personaCountersKey, saveToStorage } from "~/common";
import { CounterItem } from "./CounterItem";
import { v4 as uuidv4 } from "uuid";

export const CounterView: Component = () => {
    const [filter, setFilter] = createSignal("");
    let refFlt: HTMLInputElement;

    const counterCount = createMemo(() => {
        return Object.keys(appCounters()).length;
    });

    const create = (ctype: "clock" | "resource") => {
        setStrInputData({
            open: true,
            title: "Add counter",
            message: "Counter name",
            value: "",
            accept: (value: string) => {
                const counter: CounterData = {
                    id: uuidv4(),
                    ctype: ctype,
                    maxval: 0,
                    owner: appSettings().ident.browserID,
                    title: value,
                }
                const newState = { ...appCounters() };
                newState[counter.id] = counter;
                saveToStorage(personaCountersKey, newState);
            },
            multiline: false
        } as StrInputState);
    }

    const items = createMemo(() => {
        return Object.values(appCounters())
            .filter((it) => filter() == "" || it.title.includes(filter()))
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((it) => {
                return {
                    title: <Texte weight={700}>{it.title}</Texte>,
                    value: it.id,
                    content: <CounterItem item={it} />,
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


    return <div class={counterRootStyle}>
        <div class={counterCtrlRowStyle}>
            <Texte size="bigger">Counters ({counterCount()})</Texte>
            <Flex vcenter>
                <Button onClick={() => create("clock")} shape="icon" title="Add new clock">
                    <FaSolidClock />
                </Button>
                <Button onClick={() => create("resource")} shape="icon" title="Add new resource">
                    <FaSolidBox />
                </Button>
            </Flex>
        </div>
        <div class={counterListStyle}>
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