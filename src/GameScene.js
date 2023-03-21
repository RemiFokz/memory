import Phaser from "phaser";
import Card from "./Card";

class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  preload() {
    this.load.image("bg", "./sprite/bg.png");
    this.load.image("back", "./sprite/back.png");
    // Load game assets here
  }
  createBackground() {
    this.add.sprite(0, 0, "bg").setOrigin(0, 0);
  }
  createCards() {
    this.cards = [];
    let positions = this.getCardPosition();
    for (let position of positions) {
      this.cards.push(new Card(this, position));
    }
  }

  getCardPosition() {
    let positions = [];
    const cardOffset = 10;
    let cardTexture = this.textures.get("back").getSourceImage();
    let cardWidth = cardTexture.width + cardOffset;
    let cardHeight = cardTexture.height + cardOffset;
    let offsetX = (this.sys.game.config.width - cardWidth * 8) / 2;
    let offsetY = (this.sys.game.config.height - cardHeight * 3) / 2;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        positions.push({
          x: offsetX + col * cardWidth,
          y: offsetY + row * cardHeight,
        });
      }
    }
    return positions;
  }
  create() {
    this.createBackground();
    this.createCards();
    // Create game objects here
  }
}
export default GameScene;
