"use client";

import { React, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { socket } from "./socket.js";
import { CreateGameForm } from "./components/MainMenu/CreateGameForm";
import { JoinGameForm } from "./components/MainMenu/JoinGameForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState("");

  useEffect(() => {
    const handleError = (error) => {
      alert(error);
    };
    const handleJoinGame = (game) => {
      router.push("/loby");
    };

    socket.on("error", handleError);
    socket.on("joinGame", handleJoinGame);

    return () => {
      socket.off("error", handleError);
      socket.off("joinGame", handleJoinGame);
    };
  }, []);

  return (
    <main className={styles.main}>
      {form == "" ? (
        <div>
          <button onClick={() => setForm("create")}>Create Game</button>
          <button onClick={() => setForm("join")}>Join Game</button>
        </div>
      ) : form == "create" ? (
        <CreateGameForm socket={socket} handleBack={() => setForm("")} />
      ) : (
        <JoinGameForm socket={socket} handleBack={() => setForm("")} />
      )}
    </main>
  );
}
