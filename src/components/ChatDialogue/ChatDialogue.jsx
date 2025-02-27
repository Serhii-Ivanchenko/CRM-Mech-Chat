import Message from "../Message/Message.jsx";
import css from "./ChatDialogue.module.css";

export default function ChatDialogue({
  messages,
  // clientAva3,
  // managerAva,
  // audioFile,
}) {
  return (
    // <div className={css.scrollBarWrapper}>
    <div className={css.secondAccordionBody}>
      {/* {summary ? "" : <MainInfoFromVoiceMessage summary={summary} />} */}

      <ul className={css.messages}>
        {messages.map((message, idx) => (
          <Message
            key={idx}
            //   orClientMsg={orClientMsg}
            //   time={time}
            message={message}
            // clientAva3={clientAva3}
            // managerAva={managerAva}
            // audioFile={audioFile}
          />
        ))}
      </ul>
    </div>
    // </div>
  );
}
