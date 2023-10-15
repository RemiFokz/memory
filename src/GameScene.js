import Phaser from "phaser";
import Card from "./Card";

class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  preload() {
    this.load.image("bg", "./sprite/bg.png");
    this.load.image("back", "./sprite/back.png");
    for (let i = 1; i < this.my_cards?.length + 1; i++) {
      this.load.image("c" + i, `./sprite/c${i}.png`);
    }
  }
  create() {
    this.createBackground();
    this.createCards();
    this.restart();
  }
  restart() {
    this.openedCard = null;
    this.openedCardsCount = 0;
    this.initCards();
  }
  initCards() {
    let positions = this.getCardPosition();

    this.cards.forEach((card) => {
      let position = positions.pop();
      card.closeCard(400);
      card.setPosition(position.x, position.y);
    });
  }
  createBackground() {
    this.add.sprite(0, 0, "bg").setOrigin(0, 0);
  }
  createCards() {
    this.cards = [];

    for (let value of this.my_cards) {
      for (let i = 0; i < 2; i++) {
        this.cards.push(new Card(this, value));
      }
    }

    this.input.on("gameobjectdown", this.onCardClicked, this);
  }
  onCardClicked(pointer, card) {
    if (card.opened) {
      return false;
    }
    if (this.openedCard) {
      if (this.openedCard.value === card.value) {
        this.openedCard = null;
        ++this.openedCardsCount;
      } else {
        this.openedCard.closeCard();
        this.openedCard = card;
      }
    } else {
      this.openedCard = card;
    }
    card.openCard();
    if (this.openedCardsCount === this.my_cards.length) {
      this.restart();
    }
  }

  getCardPosition() {
    let positions = [];
    const cardOffset = 10;
    let cardTexture = this.textures.get("back").getSourceImage();
    let cardWidth = cardTexture.width + cardOffset;
    let cardHeight = cardTexture.height + cardOffset;
    let offsetX = (this.sys.game.config.width - cardWidth * this.cols) / 2;
    let offsetY = (this.sys.game.config.height - cardHeight * this.rows) / 2;
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        positions.push({
          x: offsetX + col * cardWidth,
          y: offsetY + row * cardHeight,
        });
      }
    }
    return Phaser.Utils.Array.Shuffle(positions);
  }
}
export default GameScene;
