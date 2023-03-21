import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "./GameScene";
const width = 1920;
const height = 1200;

const MyScene = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      rows: 3,
      cols: 8,
      parent: "game",
      scene: new GameScene(),
    };
    const game = new Phaser.Game(config);

    gameRef.current = game;

    return () => {
      game.destroy();
    };
  }, []);

  return <div id="game" />;
};

export default MyScene;
