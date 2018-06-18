import Phaser from 'phaser';
import sprite from '../../../assets/sky.png';

const BACKGROUND_KEY = 'background';

class Background extends Phaser.GameObjects.Image {
  constructor (config) {
    super(config.scene, config.x, config.y, BACKGROUND_KEY);
    config.scene.add.existing(this);
  }

  static preload (scene) {
    scene.load.image(BACKGROUND_KEY,
      sprite
    );
  }
}

export default Background;
