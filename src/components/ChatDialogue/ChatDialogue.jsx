import Message from "../Message/Message.jsx";
import css from "./ChatDialogue.module.css";

export default function ChatDialogue({
  messages,
  // clientAva3,
  // managerAva,
  audioFile,
}) {
  return (
    <div className={css.scrollBarWrapper}>
      <div className={css.secondAcordionBody}>
        {/* {summary ? "" : <MainInfoFromVoiceMessage summary={summary} />} */}

        <ul className={css.messages}>
          {messages.map((message) => (
            <Message
              key={Math.random()}
            //   orClientMsg={orClientMsg}
              //   time={time}
              message={message}
              // clientAva3={clientAva3}
              // managerAva={managerAva}
              audioFile={audioFile}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
