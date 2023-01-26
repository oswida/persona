import { createMemo, createSignal, For } from "solid-js";
import { sessionData } from "~/common";

import { dndzone as dndZoneDirective } from "solid-dnd-directive";

const dndzone = dndZoneDirective;

export const TableView = () => {
  // let transform = { x: 0, y: 0 };
  // let refMove: HTMLDivElement;

  // const onDragMove: DragEventHandler = ({ overlay }) => {
  //   if (overlay) {
  //     transform = { ...overlay.transform };
  //   }
  // };

  // const onDragEnd: DragEventHandler = ({ draggable }) => {
  //   const node = draggable.node;
  //   node.style.setProperty("top", node.offsetTop + transform.y + "px");
  //   node.style.setProperty("left", node.offsetLeft + transform.x + "px");
  // };

  const [items, setItems] = createSignal([
    { id: 1, title: "item 1" },
    { id: 2, title: "item 2" },
    { id: 3, title: "item 3" },
  ]);

  const handleDndEvent = (e: any) => {
    const { items: newItems } = e.detail;
    setItems(newItems);
  };

  return <div>table</div>;

  // return (
  //   <DragDropProvider onDragEnd={onDragEnd} onDragMove={onDragMove}>
  //     <DragDropSensors />
  //     <div class={TableStyle}>
  //       <For each={Object.values(sessionCards())}>
  //         {(it) => <CardObject card={it} />}
  //       </For>
  //       <Drag id={1} />
  //       <Drag id={2} />
  //     </div>
  //     <DragOverlay class={TableOverlayStyle}>
  //       {<div class={TableMovingStyle}></div>}
  //     </DragOverlay>
  //   </DragDropProvider>
  // );
};
