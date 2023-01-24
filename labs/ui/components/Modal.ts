import { Div } from "./Div";

let root: HTMLElement | null = null;
let currentModal: HTMLElement | null = null;

function init(rootEl: HTMLElement) {
  root = rootEl;
}

type ModalElementProps = {
  children: HTMLElement;
};

function ModalElement(props: ModalElementProps) {
  const el = Div({
    styles: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background: "rgba(0, 0, 0, 0.5)"
    },
  });

  const modalContent = Div({
    styles: {
      maxWidth: "960px",
      width: "90%",
      height: "90%",
      margin: "0 auto",
      background: "white"
    },
  });
  el.append(modalContent)

  modalContent.append(props.children);

  return el;
}

function open(el: HTMLElement) {
  currentModal = ModalElement({
    children: el,
  });
  root.append(currentModal);
}

function close() {
  currentModal.remove();
}

export const Modal = {
  init,
  open,
  close,
};
