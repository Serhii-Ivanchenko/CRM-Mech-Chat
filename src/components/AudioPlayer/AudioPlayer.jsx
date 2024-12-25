import css from "./AudioPlayer.module.css";
import { Slider, Typography } from "@mui/material";
import { GiSoundWaves } from "react-icons/gi";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { useState } from "react";
import { useRef } from "react";

export default function AudioPlayer({ audio, size }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    const currentTime = audioRef.current.currentTime;
    setProgress(currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSliderChange = (event, value) => {
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false); // Повертаємо стан у "не відтворюється"
    setProgress(0); // Повертаємо слайдер у початок
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  //   const playerDesign = (type) => {
  //     switch (type) {
  //       case "client":
  //         return css.callTranscriptionClient;
  //       case "lastCall":
  //         return css.callTranscriptionLastCall;
  //       case "accounting":
  //         return css.callTranscriptionAccounting;
  //       default:
  //         return css.callTranscription;
  //     }
  //   };

  return (
    // <div className={css.callRecordWrapper}>
    //   {showUserPhoto && <img src={userAvater} alt="user avater" />}

    <div className={css.callTranscription}>
      <Slider
        className={css.customSlider}
        value={progress}
        max={duration}
        onChange={handleSliderChange}
      />
      <div className={css.wrapperOfUiElement}>
        <button
          className={css.transcriptionBtn}
          onClick={togglePlay}
        >
          {isPlaying ? (
            <BsPauseFill
              size={`${size === "big" ? 24 : 12}`}
              fill="var(--play-btn-triangle)"
            />
          ) : (
            <BsPlayFill
              size={`${size === "big" ? 24 : 12}`}
              fill="var(--play-btn-triangle)"
            />
          )}
        </button>
        <GiSoundWaves
          size={80}
          className={css.wave}
        />
        <Typography
          //   className={css.time}
          variant="caption"
          sx={{
            color: "#fff",
            zIndex: "1",
            lineHeight: "1",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {formatTime(progress)}
        </Typography>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleProgress}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnd}
        src={audio}
      />
    </div>
    // </div>
  );
}
