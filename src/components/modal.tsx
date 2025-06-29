import { type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

const Modal = ({ children, isOpen }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-75 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
      <div className="shadow-2xl rounded-xl overflow-auto transform-style-preserve-3d animate-pop-in perspective-1000">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
