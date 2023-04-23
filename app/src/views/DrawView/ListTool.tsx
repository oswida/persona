import { FaSolidPlus, FaSolidDeleteLeft } from "solid-icons/fa";
import { Accessor, Component, createSignal } from "solid-js";
import { Flex, Select, Button, Texte, Input, SelectOption } from "~/components";


type Props = {
    options: Accessor<SelectOption[]>;
    optionChange: (sel: SelectOption | null) => void;
    action: () => void;
    applyFilter: (value: string) => void;
}

export const ListTool: Component<Props> = ({ options, optionChange, action, applyFilter }) => {
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

    return <Flex vcenter >
        <Select options={options} onChange={optionChange} />
        <Button shape="icon" title="Insert selected" onClick={action}>
            <FaSolidPlus />
        </Button>
        <Flex vcenter style={{ "justify-content": "flex-end", "margin-left": "10px" }}>
            <Texte size="small">Filter: </Texte>
            <Input size="small"
                underline transparent
                ref={(e) => (refFilter = e)}
                onInput={doFilter}
                style={{ width: "8em" }} />
            <Button shape="icon" size="small" onClick={clear}>
                <FaSolidDeleteLeft />
            </Button>
        </Flex>
    </Flex>
}