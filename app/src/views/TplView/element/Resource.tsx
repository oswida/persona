import { Component, For } from "solid-js";
import { Flex } from "~/components";
import { TplResource } from "~/templates/types";

type Props = {
  res: TplResource;
};

export const Resource: Component<Props> = ({ res }) => {
  return (
    <Flex>
      <For each={}></For>
    </Flex>
  );
};
