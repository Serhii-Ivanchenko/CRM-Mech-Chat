import css from "./PlayerAndSummary.module.css";
import MainInfoFromVoiceMessage from "../MainInfoFromVoiceMessage/MainInfoFromVoiceMessage.jsx";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AudioPlayer from "../AudioPlayer/AudioPlayer.jsx";
import Summary from "../Summary/Summary.jsx";

export default function PlayerAndSummary({ summary, audio }) {
  return (
    <Accordion
      disableGutters={true}
      sx={{
        background: "none",
        color: "inherit",
        WebkitBoxShadow: "none",
      }}
    >
      <div className={css.secondAcordion}>
        <AudioPlayer audio={audio} size="big" />
        <AccordionSummary
          className={css.accordionSummary}
          sx={{
            width: "auto",
            padding: "0",
          }}
        >
          <MainInfoFromVoiceMessage />
        </AccordionSummary>
      </div>
      <AccordionDetails
        sx={{
          padding: "0",
        }}
      >
        {summary && <Summary summary={summary} />}
      </AccordionDetails>
    </Accordion>
  );
}
