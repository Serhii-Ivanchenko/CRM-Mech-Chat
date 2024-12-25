import clsx from "clsx";
import css from "./Message.module.css";
import PlayerAndSummary from "../PlayerAndSummary/PlayerAndSummary.jsx";

export default function Message({
  message,
  // clientAva3,
  // managerAva,
  // audioFile,
}) {
  const clientAva = message.orClientMsg && message.avatar;

  const managerAva = message.orClientMsg === false && message.avatar;
  return (
    <li
      className={clsx(
        css.messageItem,
        message.orClientMsg ? css.clientMessageItem : css.managerMessageItem
      )}
    >
      <div className={css.messageInformation}>
        <p
          className={clsx(
            css.author,
            message.orClientMsg ? css.client : css.manager
          )}
        >
          {message.orClientMsg ? (
            <img src={clientAva} />
          ) : (
            <img src={managerAva} />
          )}
        </p>
        {/* <p className={css.time}>{time}</p> */}
      </div>
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
