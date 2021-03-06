import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const el = document.createElement("div");
  el.className = "fixed inset-0 bg-gray-800 bg-opacity-50";

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  });

  return ReactDOM.createPortal(children, el);
};

export default Modal;
