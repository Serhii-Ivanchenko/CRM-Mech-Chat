import {
  BsXLg,
  BsFillPencilFill,
  BsChevronDown,
  BsEmojiSmile,
  BsMic,
  BsChevronUp,
  BsStopCircle,
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
import AudioPlayer from "../AudioPlayer/AudioPlayer.jsx";
import { IoDocumentAttachOutline } from "react-icons/io5";

const initialMessages = [
  {
    orClientMsg: true,
    name: "Олександр",
    message: "Підкажіть, чи зроблена вже електрика?",
    audio: null,
    avatar: clientAva3,
    files: [],
  },
  {
    orClientMsg: false,
    name: "Lisa",
    message: "Так, це вже готово",
    avatar: managerAva,
    files: [],
  },
  {
    orClientMsg: true,
    name: "Олександр",
    message: null,
    audio: audioFile,
    summary: "Супер, буду після обіду!",
    avatar: clientAva3,
    files: [],
  },
  {
    orClientMsg: false,
    name: "Lisa",
    message: "Так, звісно, прийїжджайте",
    avatar: managerAva,
    files: [],
  },
  {
    orClientMsg: true,
    name: "Олександр",
    message: "Добре",
    avatar: clientAva3,
    files: [],
  },
  {
    orClientMsg: false,
    name: "Lisa",
    message: null,
    audio: audioFile,
    summary: "Гарного дня!",
    avatar: managerAva,
    files: [],
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
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [previewFiles, setPreviewFiles] = useState([]);

  const mediaRecorderRef = useRef(null);
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

  // Завантаження файлів
  const mimeToExtensionMap = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/x-rar-compressed": "rar",
    "application/zip": "zip",
    "application/x-zip-compressed": "zip",
    "application/x-7z-compressed": "7z",
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const maxFiles = 5;

    if (files.length + previewFiles.length > maxFiles) {
      alert(`Можна завантажити не більше ${maxFiles} файлів`);
      return;
    }

    const newFiles = files.map((file) => ({
      name: file.name,
      type: file.type,
      url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      file,
    }));

    setPreviewFiles((prev) => [...prev, ...newFiles]);
  };

   const removeImagePreview = (index) => {
     setPreviewFiles((prev) => prev.filter((_, i) => i !== index));
   };

  // Емоджі
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

  // Відправка повідомлення
  const handleMessageSend = () => {
    if (audioBlob) {
      const audioURL = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioURL);
      audio.onloadedmetadata = () => {
        const duration = Math.round(audio.duration);
        setAudioDuration(duration);

        const newAudioMessage = {
          orClientMsg: false,
          name: "Lisa",
          message: null,
          // audio: URL.createObjectURL(audioBlob),
          audio: audioURL,
          duration: duration,
          avatar: managerAva,
        };
        setMessages([...messages, newAudioMessage]);
        setAudioBlob(null);
      };
    } else if (message.trim() !== "" || previewFiles.length) {
      const newMessage = {
        orClientMsg: false,
        name: "Lisa",
        message: message,
        audio: null,
        avatar: managerAva,
        files: previewFiles.length
          ? previewFiles.map(({ name, type, file, url }) => ({
              name,
              type,
              file,
              url,
            }))
          : undefined,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      setPreviewFiles([]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && message.trim() !== "") {
      handleMessageSend();
    }
  };

  // Промотка до останнього повідомлення
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

  // Audio message
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
        setAudioBlob(audioBlob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

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
        <ChatDialogue
          messages={messages}
          // audioFile={audioFile}
        />
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
            {previewFiles.length > 0 && (
              <div className={css.previewContainer}>
                {previewFiles.map((file, index) => (
                  <div key={index} className={css.previewItem}>
                    {file.url ? (
                      file.type.startsWith("image/") && (
                        <>
                          <img
                            src={file.url}
                            alt={`Preview ${index}`}
                            className={css.previewImage}
                          />
                          <button
                            className={css.removePreviewDoc}
                            onClick={() => removeImagePreview(index)}
                          >
                            ✕
                          </button>
                        </>
                      )
                    ) : (
                      <>
                        <div className={css.previewDoc}>
                          <IoDocumentAttachOutline
                            style={{ transform: "scale(1.4)" }}
                          />
                          <p className={css.fileName}>
                            {file.name.length > 5
                              ? `${file.name.slice(0, 5)}...`
                              : file.name}{" "}
                            {mimeToExtensionMap[file.type] ||
                              file.type.split("/")[1]}
                          </p>
                        </div>
                        <button
                          className={css.removePreviewDoc}
                          onClick={() => removeImagePreview(index)}
                        >
                          ✕
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/x-rar-compressed,application/zip,application/x-zip-compressed,application/x-7z-compressed"
              multiple
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
          {!isRecording ? (
            <BsMic className={css.micIcon} onClick={handleMicClick} />
          ) : (
            <BsStopCircle
              className={`${css.micIcon} ${css.recording}`}
              onClick={handleMicClick}
            />
          )}
          {audioBlob && (
            <div className={css.playerWrapper}>
              <AudioPlayer
                audio={URL.createObjectURL(audioBlob)}
                size="small"
                duration={audioDuration}
              />
              <BsXLg onClick={() => setAudioBlob(null)} />
            </div>
          )}
        </div>
        <button className={css.sendBtn} onClick={handleMessageSend}>
          <PiTelegramLogoLight className={css.sendIcon} />
        </button>
      </div>
    </div>
  );
}
