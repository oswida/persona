import { Accessor, createMemo, createSignal, For, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { EffectCards, EffectCoverflow, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/solid";
import { v4 as uuidv4 } from "uuid";
import {
  CardData,
  cardsData,
  currentStyle,
  personaCardsKey,
  saveGenericData,
  setCardsData,
} from "~/common";
import {
  Accordion,
  AccordionDesc,
  Button,
  Dialog,
  Flex,
  Input,
  Texte,
} from "~/components";
import { CardDialog } from "./CardDialog";
import { CardView } from "./CardView";
import { CardStyle, CardSwiperStyle } from "./styles.css";

export const CardList = () => {
  const [swiper, setSwiper] = createSignal<any>();
  const [cfilter, setCFilter] = createSignal("");
  const [selectedItem, setSelectedItem] = createSignal<CardData>();
  const [api, setApi] = createSignal<
    Accessor<{
      isPressed: boolean;
      pressableProps: JSX.HTMLAttributes<any>;
    }>
  >();

  const create = (value: CardData) => {
    const newState = { ...cardsData() };
    const id = uuidv4();
    newState[id] = {
      id: id,
      title: value.title,
      content: value.content,
      footer: value.footer,
      isPublic: false,
    } as CardData;
    setCardsData(newState);
    saveGenericData(personaCardsKey, newState);
  };

  const next = () => {
    const sw = swiper();
    if (!sw) return;
    sw.slideNext();
  };

  const prev = () => {
    const sw = swiper();
    if (!sw) return;
    sw.slidePrev();
  };

  const flt = (e: any) => {
    // const sw = swiper();
    // if (!sw) return;
    setCFilter(e.target.value);

    // sw.update();
  };

  const itemList = createMemo(() => {
    return Object.values(cardsData())
      .filter((v) => cfilter().trim() == "" || v.title.includes(cfilter()))
      .map((it) => {
        return {
          title: it.title,
          value: it.id,
          content: <CardView item={it} />,
        } as AccordionDesc;
      });
  });

  return (
    <Flex dn="column" center>
      {/* <Swiper
        class={CardSwiperStyle}
        style={currentStyle()}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => setSwiper(swiper)}
        modules={[EffectCards, EffectCoverflow, Mousewheel]}
        effect={"cards"}
        mousewheel={true}
      >
        <For
          each={Object.values(cardsData()).filter(
            (v) => filter().trim() == "" || v.title.includes(filter())
          )}
        >
          {(it) => (
            <SwiperSlide class={CardStyle}>
              <Flex dn="column">
                <Texte>{it.title}</Texte>
                <Texte>{it.content}</Texte>
              </Flex>
            </SwiperSlide>
          )}
        </For>
      </Swiper> */}
      <div style={{ "max-height": "50vh", "overflow-y": "auto" }}>
        <Dynamic component={Accordion} items={itemList} />
      </div>
      <Input underline onInput={flt} />
      <Flex center>
        <Dialog trigger={"Create"} title="Create card" passApi={setApi}>
          <CardDialog item={selectedItem} onClick={create} api={api} />
        </Dialog>
        <Button onClick={prev}>Prev</Button>
        <Button onClick={next}>Next</Button>
      </Flex>
    </Flex>
  );
};
