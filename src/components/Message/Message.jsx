import clsx from "clsx";
import css from "./Message.module.css";
import PlayerAndSummary from "../PlayerAndSummary/PlayerAndSummary.jsx";

export default function Message({ message }) {
  const clientAva = message.orClientMsg && message.avatar;

  const managerAva = message.orClientMsg === false && message.avatar;
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
        <PlayerAndSummary audio={message.audio} summary={message.summary} />
      ) : (
        <p
          className={clsx(
            message.orClientMsg ? css.clientMessage : css.managerMessage
          )}
        >
          {message.message}
        </p>
      )}
    </li>
  );
}
