import { useState } from "react";
import css from "./ChatBtn.module.css";
import { BsChatText } from "react-icons/bs";
import Modal from "../Modal/Modal.jsx";
import ChatModal from "../ChatModal/ChatModal.jsx";

export default function ChatBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={css.btn} onClick={openModal}>
        <BsChatText className={css.icon} />
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <ChatModal onClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}
