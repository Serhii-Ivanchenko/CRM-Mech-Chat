import clsx from "clsx";
import css from "./Message.module.css";
import PlayerAndSummary from "../PlayerAndSummary/PlayerAndSummary.jsx";
import { useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import Modal from "../Modal/Modal.jsx";

export default function Message({ message }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const clientAva = message.orClientMsg && message.avatar;
  const managerAva = message.orClientMsg === false && message.avatar;
  const audioDuration = message.duration || 0;

  const handleImageClick = (url) => {
    setModalImage(url);
    setIsModalOpen(true);
  };

  const handleDownload = (file) => {
    const blob = new Blob([file.file], { type: file.type });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.name;
    link.click();
    console.log("Download file");
  };

  const closeModal = (e) => {
    e.stopPropagation();

    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <li
      className={clsx(
        css.messageItem,
        message.orClientMsg ? css.clientMessageItem : css.managerMessageItem
      )}
    >
      {message.orClientMsg ? (
        <img src={clientAva} className={css.avatar} />
      ) : (
        <img src={managerAva} className={css.avatar} />
      )}
      {message.audio ? (
        <PlayerAndSummary
          audio={message.audio}
          summary={message.summary}
          audioDuration={audioDuration}
        />
      ) : (
        <div
          className={clsx(
            message.orClientMsg ? css.clientMessage : css.managerMessage
          )}
        >
          <div className={css.messageUpperPart}>
            {message.files?.length > 0 &&
              message.files.map((file, index) => {
                if (file.type.startsWith("image/")) {
                  return (
                    <img
                      key={index}
                      src={file.url}
                      alt={`Зображення ${index + 1}`}
                      className={css.image}
                      onClick={() => handleImageClick(file.url)}
                    />
                  );
                } else if (
                  file.type === "application/pdf" ||
                  file.type === "application/msword" ||
                  file.type ===
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ) {
                  return (
                    <button
                      key={index}
                      onClick={() => handleDownload(file)}
                      className={css.downloadBtn}
                    >
                      <FaFileDownload /> {file.name}
                    </button>
                  );
                }
                return null;
              })}
          </div>
          <p>{message.message}</p>
        </div>
      )}


      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {/* <div className={css.modalContent}> */}
            <img
              src={modalImage}
              alt="Повне зображення"
              className={css.modalImage}
            />
          {/* </div> */}
        </Modal>
      )}
    </li>
  );
}
