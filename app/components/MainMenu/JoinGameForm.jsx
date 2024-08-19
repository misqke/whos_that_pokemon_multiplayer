import React, { useState } from "react";
import styles from "./mainMenuForm.module.css";

export const JoinGameForm = ({ handleBack, socket }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    socket.emit("joinGame", { name, code });
  };

  return (
    <div>
      <div>
        <label>Name</label>
        <input value={name} onInput={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Game Code</label>
        <input value={code} onInput={(e) => setCode(e.target.value)} />
      </div>
      <div>
        <button onClick={handleBack}>Back</button>
        <button onClick={handleSubmit}>Join</button>
      </div>
    </div>
  );
};
