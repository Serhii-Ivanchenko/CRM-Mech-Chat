import css from "./MainInfoFromVoiceMessage.module.css";
import { useState } from "react";

export default function MainInfoFromVoiceMessage() {
  const [transcription, setTranscription] = useState(false);
  const toggleTranscription = () => setTranscription(!transcription);

  return (
    <button
      className={css.transcriptionToggleBtn}
      onClick={() => toggleTranscription()}
    >
      <p>Aa</p>
    </button>
  );
}
