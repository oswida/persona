import { FaSolidExplosion } from "solid-icons/fa";
import toast, { ToastPosition } from "solid-toast";
import { currentStyle } from "~/common";
import { Flex } from "../Flex";
import { Texte } from "../Texte";
import { ToastStyle } from "./styles.css";

export const showToast = (
  children: any,
  position: ToastPosition = "bottom-center"
) => {
  toast.dismiss();
  toast.custom(
    () => (
      <div
        class={ToastStyle}
        style={currentStyle()}
        onClick={() => toast.dismiss()}
      >
        {children}
      </div>
    ),
    {
      duration: 10000,
      position: position,
    }
  );
};

export const showError = (text: string) => {
  toast.custom(
    () => (
      <div
        class={ToastStyle}
        style={currentStyle()}
        onClick={() => toast.dismiss()}
      >
        <Flex>
          <FaSolidExplosion color="red" />
          <Texte>{text}</Texte>
        </Flex>
      </div>
    ),
    {
      duration: 5000,
      unmountDelay: 500,
      position: "top-center",
    }
  );
};
