import Phaser from "phaser";

class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, value) {
    super(scene, 0, 0, "c" + value);
    this.scene = scene;
    this.value = value;
    this.setOrigin(0.5, 0.5);
    this.scene.add.existing(this);
    this.setInteractive();
    this.opened = false;
  }
  flip(texture, delay = 0) {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: "Linear",
      duration: 150,
      delay,
      onComplete: () => {
        this.showCard(texture);
      },
    });
  }
  showCard(texture) {
    this.setTexture(texture);
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      ease: "Linear",
      duration: 150,
    });
  }

  openCard() {
    this.opened = true;
    this.flip("c" + this.value);
  }
  closeCard(delay = 300) {
    this.opened = false;
    this.flip("back", delay);
  }
}
export default Card;
