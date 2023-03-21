import Phaser from "phaser";

class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, position) {
    super(scene, position.x, position.y, "back");
    this.scene = scene;
    this.setOrigin(0, 0);
    scene.add.existing(this);
  }
}
export default Card;
