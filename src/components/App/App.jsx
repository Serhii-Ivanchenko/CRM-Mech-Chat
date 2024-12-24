import { useState } from "react";
import css from "./App.module.css";
import ChatBtn from "../ChatBtn/ChatBtn.jsx";

export default function App() {
  return (
    <div className={css.appContainer}>
      <h1>CRM Mech Chat</h1>
      <ChatBtn/>
    </div>
  );
}
