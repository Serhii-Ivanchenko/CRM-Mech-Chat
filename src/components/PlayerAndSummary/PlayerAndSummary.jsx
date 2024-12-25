import css from "./PlayerAndSummary.module.css";
import MainInfoFromVoiceMessage from "../MainInfoFromVoiceMessage/MainInfoFromVoiceMessage.jsx";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import userPhoto from "../../assets/img/avatar_default.png";
import AudioPlayer from "../AudioPlayer/AudioPlayer.jsx";

// import TranscriptionComponent from "../TranscriptionComponent/TranscriptionComponent";
// import TranscribedDialog from "../TranscriptionComponent/TranscribedDialog/TranscribedDialog";

export default function PlayerAndSummary(
  messages,
  summary,
  sizePlayer,
  sizeBtn,
  audio,
  userAvatar,
  showPhoto,
  accounting
) {
  return (
    // <div className={css.secondAcordionList}>
    //   <div className={css.secondAcordionWrapper}>
    <Accordion
      disableGutters={true}
      sx={{
        background: "none",
        color: "inherit",
        WebkitBoxShadow: "none",
      }}
    >
      <div
        className={`${css.secondAcordion} ${
          accounting && css.secondAcordionAccounting
        }`}
      >
        {/* <div className={css.callRecordWrapper}> */}

        {/* {showPhoto && (
          <img
            className={css.userPhoto}
            src={userAvatar || userPhoto}
            alt="user avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = userPhoto;
            }}
          />
        )} */}

        {/* {accounting && (
          <MainInfoFromVoiceMessage accounting={accounting} summary={summary} />
        )} */}

        <AudioPlayer audio={audio} size={sizePlayer} />
        {/* </div> */}
        <AccordionSummary
          className={css.accordionSummary}
          sx={{
            padding: "0",
          }}
        >
          <MainInfoFromVoiceMessage size={sizeBtn} />
        </AccordionSummary>
      </div>
      <AccordionDetails
        sx={{
          padding: "0",
        }}
      >
        {/* <TranscribedDialog
          summary={summary}
        messages={messages}
        accounting={accounting}
        /> */}
      </AccordionDetails>
    </Accordion>
    //   </div>
    // </div>
  );
}
