import css from "./MainInfoFromVoiceMessage.module.css";
import { useState } from "react";

export default function MainInfoFromVoiceMessage() {
  const [transcription, setTranscription] = useState(false);
  const toggleTranscription = () => setTranscription(!transcription);

  return (
    // <Accordion className={css.accordion}>
    //   <AccordionSummary
    //     sx={{
    //       padding: "0",
    //     }}
    //     className={css.accordionSummary}
    //   >
    <button
      className={css.transcriptionToggleBtn}
      onClick={() => toggleTranscription()}
    >
      <p>Aa</p>
      {/* <BsChevronDown
        className={clsx(
          css.transcriptionIcon,
          transcription ? css.activeTranscriptionIcon : null
        )}
        strokeWidth={3}
        size={14}
      /> */}
    </button>
  );
}
