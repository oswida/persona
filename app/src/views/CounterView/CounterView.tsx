import { Component, createMemo, createSignal } from "solid-js";
import { AccordionDesc, StrInputState, Texte, setStrInputData } from "~/components";
import { CounterData, appCounters, appSettings, personaCountersKey, saveToStorage } from "~/common";
import { CounterItem } from "./CounterItem";
import { v4 as uuidv4 } from "uuid";
import { AccordionListView } from "../AccordionListView";

export const CounterView: Component = () => {
    const [filter, setFilter] = createSignal("");
    // const [ct, setCT] = createSignal<"clock" | "resource">("clock");

    let refFlt: HTMLInputElement;

    const counterCount = createMemo(() => {
        return Object.keys(appCounters()).length;
    });

    const create = () => {
        // const ctype = ct();
        setStrInputData({
            open: true,
            title: "Add counter",
            message: "Counter name",
            value: "",
            accept: (value: string) => {
                if (value.trim() === "") return;
                const counter: CounterData = {
                    id: uuidv4(),
                    ctype: "resource",
                    maxval: 0,
                    owner: appSettings().ident.browserID,
                    title: value,
                }
                const newState = { ...appCounters(), [counter.id]: counter };
                saveToStorage(personaCountersKey, newState);
            },
            multiline: false
        } as StrInputState);
    }

    const items = createMemo(() => {
        return Object.values(appCounters())
            .filter((it) => filter() == "" || it.title.toLowerCase().includes(filter().toLowerCase()))
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((it) => {
                return {
                    title: <Texte weight={700}>{it.title}</Texte>,
                    value: it.id,
                    content: <CounterItem item={it} />,
                } as AccordionDesc;
            });
    });


    return <AccordionListView
        title="Counters"
        count={counterCount}
        create={create}
        items={items}
        applyFilter={(value: string) => setFilter(value)}

    // actions={<Flex vcenter>
    //     <Button
    //         onClick={() => setCT("clock")}
    //         shape="icon"
    //         title="Add new clock"
    //         selected={() => ct() == "clock"}>
    //         <FaSolidClock />
    //     </Button>
    //     <Button
    //         onClick={() => setCT("resource")}
    //         shape="icon"
    //         title="Add new resource"
    //         selected={() => ct() == "resource"}>
    //         <FaSolidBox />
    //     </Button>
    // </Flex>}
    />

}