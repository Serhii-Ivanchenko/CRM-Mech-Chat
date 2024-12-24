import {
  BsXLg,
  BsFillPencilFill,
  BsChevronDown,
  BsEmojiSmile,
  BsMic,
} from "react-icons/bs";
import css from "./ChatModal.module.css";
import clientAva1 from "../../assets/img/client_1.png";
import clientAva2 from "../../assets/img/client_2.png";
import clientAva3 from "../../assets/img/client_3.png";
import managerAva from "../../assets/img/manager.png";
import { PiTelegramLogoLight, PiPaperclip } from "react-icons/pi";

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
  return (
    <div className={css.modalWrapper}>
      <BsXLg className={css.closeBtn} onClick={onClose} />
      <h2 className={css.title}>Chat</h2>
      <div className={css.upperWrapper}>
        <div className={css.typingWrapper}>
          <BsFillPencilFill />
          <p className={css.typing}>
            <span className={css.name}>{messages[0].name}</span> друкує...
          </p>
        </div>
        <div className={css.avatarWrapper}>
          <img className={css.clientAvaTop} src={clientAva1} alt="client_1" />
          <img className={css.clientAvaTop} src={clientAva2} alt="client_2" />
          <BsChevronDown />
        </div>
      </div>
      <div className={css.chatWindow}></div>
      <div className={css.bottomWrapper}>
        <input className={css.input} type="text" />
              <PiPaperclip className={css.clipIcon} />
        <BsEmojiSmile className={css.smileIcon} />
        <BsMic className={css.micIcon} />
        <button className={css.sendBtn}>
          <PiTelegramLogoLight />
        </button>
      </div>
    </div>
  );
}
