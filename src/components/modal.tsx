import { type ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

const Modal = ({ children, isOpen }: ModalProps) => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
      <div className="shadow-2xl rounded-xl overflow-auto transform-style-preserve-3d animate-pop-in perspective-1000 transform-style-preserve-3d animate-pop-in">
        {children}
      </div>
    </div>
  );
};

export default Modal;
