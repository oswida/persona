import {
  personaSessionsKey,
  PlaySession,
  playSessionList,
  saveGenericData,
  setPlaySessionList,
  settingsData,
} from "~/common";
import { Button, Flex, Input, Select } from "~/components";
import { v4 as uuidv4 } from "uuid";
import { createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import { FaSolidTrash } from "solid-icons/fa";

export const SessionView = () => {
  let refName: HTMLInputElement;
  const create = () => {
    if (!refName || refName.value.trim() === "") return;
    const newState = [
      ...playSessionList(),
      {
        id: uuidv4(),
        name: refName.value,
        ownerId: settingsData().ident.browserID,
        cards: {},
        charsheets: {},
        players: {},
      } as PlaySession,
    ];
    setPlaySessionList(newState);
    saveGenericData(personaSessionsKey, newState);
    refName.value = "";
  };

  const items = createMemo(() => {
    return playSessionList().map((it) => ({
      label: it.name,
      value: it.id,
    }));
  });

  return (
    <Flex dn="column">
      <Flex>
        <Dynamic
          component={Select}
          label="Session"
          options={playSessionList().map((it) => ({
            label: it.name,
            value: it.id,
          }))}
        />
        <Button>
          <FaSolidTrash />
        </Button>
      </Flex>
      <Flex>
        <Input ref={(e) => (refName = e)} style={{ width: "12rem" }} />
        <Button onClick={create}>Create</Button>
      </Flex>
    </Flex>
  );
};
