import { Accessor, Component, createSignal } from "solid-js";
import { CardData } from "~/common";
import { Button, Flex, Input, InputArea, Texte } from "~/components";

type Props = {
  item: Accessor<CardData | undefined>;
  onClick: (value: CardData) => void;
  api: Accessor<any>;
};

export const CardDialog: Component<Props> = ({ item, onClick, api }) => {
  let refTitle: HTMLInputElement;
  let refContent: HTMLDivElement;
  let refFooter: HTMLDivElement;

  const save = () => {
    if (!refTitle || !refContent || !refFooter) return;
    onClick({
      title: refTitle.value,
      content: refContent.innerText,
      footer: refFooter.innerText,
    } as CardData);
    api().close();
  };

  return (
    <Flex dn="column">
      <Texte size="small">Title</Texte>
      <Input value={item()?.title} ref={(e) => (refTitle = e)} />
      <Texte size="small">Content</Texte>
      <InputArea
        style={{ height: "15.5rem", width: "500px" }}
        contentEditable
        ref={(e) => (refContent = e)}
      >
        {item()?.content}
      </InputArea>
      <Texte size="small">Footer</Texte>
      <InputArea
        style={{ height: "2.5rem", width: "500px" }}
        contentEditable
        ref={(e) => (refFooter = e)}
      >
        {item()?.footer}
      </InputArea>
      <Button onClick={save}>Save</Button>
    </Flex>
  );
};
