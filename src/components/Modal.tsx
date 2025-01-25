import { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-11/12 max-w-md">
        <button className="ml-96" onClick={onClose}>
          ✖️
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
