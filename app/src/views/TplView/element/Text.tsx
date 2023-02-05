import { Match, Show, Switch } from "solid-js";
import { Flex, Input, InputArea, Texte } from "~/components";
import { TplElement, TplText } from "~/templates/types";

export const Text = ({ element }: { element: TplElement }) => {
  const item = element.content as TplText;
  return (
    <Flex dn="column">
      <Show when={item.label}>
        <Texte themeColor="secondary" size="middle">
          {item.label}
        </Texte>
      </Show>
      <Switch>
        <Match when={!item.lines || item.lines <= 1}>
          <Input id={item.id} underline transparent />
        </Match>
        <Match when={item.lines && item.lines > 1}>
          <InputArea id={item.id} />
        </Match>
      </Switch>
    </Flex>
  );
};
