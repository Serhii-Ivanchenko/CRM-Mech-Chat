import css from "./Summary.module.css";

export default function Summary({ summary }) {
  return (
    <div className={css.summaryWrapper}>
      <div className={css.textWrapper}>
        <p className={css.summaryText}>{summary}</p>
      </div>
    </div>
  );
}
