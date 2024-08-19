"use client";
import { React, useState, useEffect } from "react";
import { socket } from "../socket.js";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [game, setGame] = useState(null);

  const handleLeaveGame = () => {
    socket.emit("leaveGame");
    router.push("/");
  };

  useEffect(() => {
    const handleGameData = (updatedGame) => {
      if (updatedGame.error) {
        socket.emit("leaveGame");
        router.push("/");
      } else setGame(updatedGame);
    };
    socket.emit("getGameData");
    socket.on("gameData", handleGameData);

    return () => {
      socket.off("gameData", handleGameData);
    };
  }, []);

  if (!game) return <div>loading...</div>;

  return (
    <div>
      <h1>{game.code}</h1>
      <p>{game.player1.name}</p>
      <p>
        {game.player2 != null ? game.player2.name : "Waiting for player..."}
      </p>
      <button onClick={handleLeaveGame}>Leave</button>
      {socket.id == game.player1.id && (
        <button disabled={game?.player2 ? false : true}>Start</button>
      )}
    </div>
  );
};

export default page;
