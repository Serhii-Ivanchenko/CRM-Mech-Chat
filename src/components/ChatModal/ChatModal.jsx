import {
  BsXLg,
  BsFillPencilFill,
  BsChevronDown,
  BsEmojiSmile,
  BsMic,
  BsChevronUp,
} from "react-icons/bs";
import css from "./ChatModal.module.css";
import clientAva1 from "../../assets/img/client_1.png";
import clientAva2 from "../../assets/img/client_2.png";
import clientAva3 from "../../assets/img/client_3.png";
import managerAva from "../../assets/img/manager.png";
import { PiTelegramLogoLight, PiPaperclip } from "react-icons/pi";
import { useState } from "react";
import clsx from "clsx";

const messages = [
  {
    orClientMsg: true,
    name: "Lisa",
    message:
      "Доброго дня, ще раз заставлю. Скажіть, будь ласка, якщо я щось відвіду, я вам дзвоню, у мене нашовання блок АБС. Може хтось подивитися, це він чи не він?",
  },
  {
    orClientMsg: false,
    name: "Менеджер",
    message:
      "Можемо тільки з наступної середи, тому що електрик у нас відпустив.",
  },
];

export default function ChatModal({ onClose }) {
  const [isActive, setIsActive] = useState(null);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAvaClick = (id) => {
    setIsActive(id);
    setHasNewMessage(id);
  };

  const handleArrowClick = () => {
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <div className={css.modalWrapper}>
      <BsXLg className={css.closeBtn} onClick={onClose} />
      <h2 className={css.title}>Chat</h2>
      <div className={css.upperWrapper}>
        <div className={css.typingWrapper}>
          <BsFillPencilFill className={css.pencilIcon} />
          <p className={css.typing}>
            <span className={css.name}>{messages[0].name}</span> друкує...
          </p>
        </div>
        <div className={css.avatarWrapper}>
          <div
            id={1}
            className={clsx(css.avaBox, isActive === 1 && css.activeAva)}
            onClick={() => handleAvaClick(1)}
          >
            <img className={css.clientAvaTop} src={clientAva1} alt="client_1" />
            {hasNewMessage !== 1 && <span className={css.hasNewMessage}></span>}
          </div>
          <div
            id={2}
            className={clsx(css.avaBox, isActive === 2 && css.activeAva)}
            onClick={() => handleAvaClick(2)}
          >
            <img className={css.clientAvaTop} src={clientAva2} alt="client_2" />
            {hasNewMessage !== 2 && <span className={css.hasNewMessage}></span>}
          </div>

          {isPopupOpen ? (
            <BsChevronUp className={css.arrow} onClick={handleArrowClick} />
          ) : (
            <BsChevronDown className={css.arrow} onClick={handleArrowClick} />
          )}
        </div>
      </div>
      <div className={css.chatWindow}></div>
      <div className={css.bottomWrapper}>
        <div className={css.inputWrapper} htmlFor="messageInput">
          <input
            className={css.input}
            type="text"
            placeholder="Message..."
          />
          <PiPaperclip className={css.clipIcon} />
          <BsEmojiSmile className={css.smileIcon} />
          <BsMic className={css.micIcon} />
        </div>
        <button className={css.sendBtn}>
          <PiTelegramLogoLight className={css.sendIcon} />
        </button>
      </div>
    </div>
  );
}
