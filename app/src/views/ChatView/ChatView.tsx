import { FaSolidDice, FaSolidTrash } from "solid-icons/fa";
import { createEffect, For } from "solid-js";
import {
  ChatEntry,
  chatList,
  currentStyle,
  mqttClient,
  prettyNow,
  setChatList,
  settingsData,
} from "~/common";
import { mqttPublish, mqttTopic, topicChat } from "~/common/mqtt";
import { Button, Flex, Input, Texte } from "~/components";
import { ChatListStyle, ChatRootStyle } from "./styles.css";

export const ChatView = () => {
  let refInput: HTMLInputElement;
  let refList: HTMLDivElement;

  const addText = (e: any) => {
    if (!refInput || refInput.value.trim() == "" || e.key != "Enter") return;
    const entry = {
      etype: "text",
      text: refInput.value,
      author: settingsData().ident.username,
      color: settingsData().ident.color,
      tstamp: prettyNow(),
    } as ChatEntry;
    const newState = [...chatList(), entry];
    setChatList(newState);
    refInput.value = "";
    const cl = mqttClient();
    if (!cl) return;
    mqttPublish(
      settingsData().ident.browserID,
      cl,
      mqttTopic(topicChat),
      entry
    );
  };

  const clearChat = () => {
    setChatList([]);
  };

  const chatItem = (item: ChatEntry) => {
    switch (item.etype) {
      case "roll":
        return (
          <Flex dn="column">
            <Flex vcenter>
              <Texte
                size={"small"}
                style={{
                  "text-transform": "uppercase",
                  color: `${item.color}`,
                }}
              >
                {item.author}:
              </Texte>
              <FaSolidDice />
            </Flex>
            <For each={item.rolls}>
              {(it) => (
                <Flex>
                  <Texte themeColor="secondary">{it.notation}:</Texte>
                  <Texte>{it.rolls.join(",")}</Texte>
                  <Texte>⇒</Texte>
                  <Texte weight={700}>{it.total}</Texte>
                </Flex>
              )}
            </For>
          </Flex>
        );

      default:
        return (
          <Flex vcenter>
            <Texte
              size={"small"}
              style={{ "text-transform": "uppercase", color: `${item.color}` }}
            >
              {item.author}:
            </Texte>
            <Texte title={item.tstamp} style={{ "overflow-wrap": "anywhere" }}>
              {item.text}
            </Texte>
          </Flex>
        );
    }
  };

  createEffect(() => {
    if (chatList().length == 0 || !refList) return;
    refList.scrollTop = refList.scrollHeight;
  });

  return (
    <div class={ChatRootStyle} style={currentStyle()}>
      <Flex style={{ "justify-content": "space-between" }}>
        <Texte>Chat</Texte>
        <Flex>
          <Button onClick={clearChat}>
            <FaSolidTrash />
          </Button>
        </Flex>
      </Flex>
      <div class={ChatListStyle} ref={(e: any) => (refList = e)}>
        <For each={chatList()}>{(it) => chatItem(it)}</For>
      </div>
      <Input size="smaller" ref={(e) => (refInput = e)} onKeyUp={addText} />
    </div>
  );
};
