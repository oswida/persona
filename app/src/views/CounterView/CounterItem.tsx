import { Component } from "solid-js";
import { CounterData, appCounters, personaCountersKey, saveToStorage, themeVars } from "~/common"
import { counterItemStyle } from "./styles.css";
import { Button, ConfirmState, Flex, Select, SelectOption, StrInputState, setConfirmData, setStrInputData } from "~/components";
import { FaSolidPlus, FaSolidTrash } from "solid-icons/fa";
import { addCounter } from "../WhiteboardView/helper";
import { listCtrlRowStyle } from "../AccordionListView/styles.css";

type Props = {
    item: CounterData;
}

export const CounterItem: Component<Props> = ({ item }) => {

    const deleteCounter = () => {
        setConfirmData({
            open: true,
            title: "Delete counter",
            message: `Do you really want to delete ${item.title}?`,
            accept: () => {
                const newState = { ...Object.values(appCounters()).filter((v) => v.id != item.id) };
                saveToStorage(personaCountersKey, newState);
            },
        } as ConfirmState);
    }

    const setMax = () => {
        setStrInputData({
            open: true,
            title: "Counter max",
            message: "Maximum value",
            value: item.maxval.toString(),
            accept: (value: string) => {
                const num = Number.parseInt(value);
                if (Number.isNaN(num)) return;
                const newState = {
                    ...appCounters(), [item.id]: {
                        ...appCounters()[item.id], maxval: num
                    }
                };
                saveToStorage(personaCountersKey, newState);
            },
            multiline: false
        } as StrInputState);
    }

    const counterTypes = () => {
        return [
            { label: "Clock", value: "clock" } as SelectOption,
            { label: "Resource", value: "resource" } as SelectOption
        ]
    }

    const counterSel = () => {
        switch (item.ctype) {
            case "clock": return 0;
            case "resource": return 1;
            default: return 0;
        }
    }

    const setType = (opt: SelectOption | null) => {
        if (!opt) return;
        const newState = {
            ...appCounters(), [item.id]: {
                ...appCounters()[item.id], ctype: opt.value as any
            }
        };
        saveToStorage(personaCountersKey, newState);
    }

    const insertCounter = () => {
        setStrInputData({
            open: true,
            title: "Add counter",
            message: "Input counter name",
            value: item.title,
            accept: (value: string) => {
                addCounter(item.id, 100, 100, value);
            },
            width: "10em",
        } as StrInputState);
    }

    return <div class={counterItemStyle}>
        <div class={listCtrlRowStyle}>
            <Flex gap="medium" vcenter style={{ flex: 1 }}>
                <Button onClick={deleteCounter} title="Delete counter" size="small">
                    <FaSolidTrash color={themeVars.color.secondary} />
                </Button>
                <Select options={counterTypes} selected={counterSel} onChange={setType}></Select>
                <Button onClick={setMax} title="Change max value" size="small">
                    {`Max: ${item.maxval}`}
                </Button>
                <Flex style={{ "justify-content": "flex-end", flex: 1 }}>
                    <Button size="small" shape="icon" onClick={insertCounter} title="Put on table">
                        <FaSolidPlus />
                    </Button>
                </Flex>
            </Flex>
        </div>
    </div>
}