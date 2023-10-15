import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "./GameScene";
const width = 1920;
const height = 1200;

const Game = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      parent: "game",
      scene: new GameScene(),
    };
    config.scene.my_cards = [1, 2, 3, 4, 5];
    config.scene.rows = 2;
    config.scene.cols = 5;

    const game = new Phaser.Game(config);

    gameRef.current = game;

    return () => {
      game.destroy();
    };
  }, []);

  return <div id="game" />;
};

export default Game;
