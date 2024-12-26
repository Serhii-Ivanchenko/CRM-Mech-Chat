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
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import audioFile from "../../assets/audio/God Rest Ye Merry Gentlmen - DJ Williams.mp3";
import ChatDialogue from "../ChatDialogue/ChatDialogue.jsx";
import EmojiPicker from "emoji-picker-react";
import { Box, ClickAwayListener } from "@mui/material";

const initialMessages = [
  {
    orClientMsg: true,
    name: "Олександр",
    message: "Підкажіть, чи зроблена вже електрика?",
    audio: null,
    avatar: clientAva3,
  },
  {
    orClientMsg: false,
    name: "Lisa",
    message: "Так, це вже готово",
    avatar: managerAva,
  },
  {
    orClientMsg: true,
    name: "Олександр",
    message: null,
    audio: audioFile,
    summary: "Супер, буду після обіду!",
    avatar: clientAva3,
  },
  {
    orClientMsg: false,
    name: "Lisa",
    message: "Так, звісно, прийїжджайте",
    avatar: managerAva,
  },
  {
    orClientMsg: true,
    name: "Олександр",
    message: "Добре",
    avatar: clientAva3,
  },
  {
    orClientMsg: false,
    name: "Lisa",
    message: null,
    audio: audioFile,
    summary: "Гарного дня!",
    avatar: managerAva,
  },
];

export default function ChatModal({ onClose }) {
  const [messages, setMessages] = useState(initialMessages);
  const [isActive, setIsActive] = useState(null);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatWindowRef = useRef(null);

  const handleInputFocus = () => {
    setIsTyping("Lisa");
    setIsEmojiPickerOpen(false);
  };

  const handleAvaClick = (id) => {
    setIsActive(id);
    setHasNewMessage(id);
    // setHasNewMessage((prev) => (prev === id ? null : prev));
  };

  const handleArrowClick = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const handleClipClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Завантажений файл:", file);
      // логіка для роботи з файлом
    }
  };

  const handleEmojiClick = (emojiData) => {
    if (!inputRef.current) return;
    const input = inputRef.current;
    const cursorPosition = input.selectionStart;

    setMessage(
      (prevMessage) =>
        prevMessage.slice(0, cursorPosition) +
        emojiData.emoji +
        prevMessage.slice(cursorPosition)
    );
    input.setSelectionRange(
      cursorPosition + emojiData.emoji.length,
      cursorPosition + emojiData.emoji.length
    );
  };

  const newMessage = {
    orClientMsg: false,
    name: "Lisa",
    message: message,
    audio: null,
    avatar: managerAva,
  };

  const handleMessageSend = () => {
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && message.trim() !== "") {
      handleMessageSend();
    }
  };

  useEffect(() => {
    // if (
    //   messages.length > 0 &&
    //   chatWindowRef.current &&
    //   treeData[treeData.length - 1]?.data === "warehouse"
    // )
    {
      chatWindowRef.current?.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className={css.modalWrapper}>
      <BsXLg className={css.closeBtn} onClick={onClose} />
      <h2 className={css.title}>Chat</h2>
      <div className={css.upperWrapper}>
        <div className={css.typingWrapper}>
          {isTyping && ( // Показувати тільки якщо typingUser не null
            <>
              <BsFillPencilFill className={css.pencilIcon} />
              <p className={css.typing}>
                <span className={css.name}>{isTyping}</span> друкує...
              </p>
            </>
          )}
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
      <div ref={chatWindowRef} className={css.chatWindow}>
        <ChatDialogue messages={messages} audioFile={audioFile} />
      </div>
      <div className={css.bottomWrapper}>
        <div className={css.inputWrapper} htmlFor="messageInput">
          <input
            ref={inputRef}
            className={css.input}
            type="text"
            placeholder="Message..."
            value={message}
            onFocus={handleInputFocus}
            onBlur={() => setIsTyping(null)}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <>
            <PiPaperclip className={css.clipIcon} onClick={handleClipClick} />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </>
          <BsEmojiSmile
            className={css.smileIcon}
            onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
          />
          {isEmojiPickerOpen && (
            <ClickAwayListener
              onClickAway={() => {
                setIsEmojiPickerOpen(false);
              }}
            >
              <Box>
                <EmojiPicker
                  className={css.emojiPicker}
                  onEmojiClick={handleEmojiClick}
                  theme="dark"
                  lazyLoadEmojis={true}
                  skinTonesDisabled={true}
                  previewConfig={{ showPreview: false }}
                />
              </Box>
            </ClickAwayListener>
          )}
          <BsMic className={css.micIcon} />
        </div>
        <button className={css.sendBtn} onClick={handleMessageSend}>
          <PiTelegramLogoLight className={css.sendIcon} />
        </button>
      </div>
    </div>
  );
}
