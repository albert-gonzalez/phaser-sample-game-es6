import Phaser from 'phaser';

const BACKGROUND_KEY = 'background';
const BACKGROUND_SPRITE_PATH = 'src/assets/sky.png';

class Background extends Phaser.GameObjects.Image {
  constructor (config) {
    super(config.scene, config.x, config.y, BACKGROUND_KEY);
    config.scene.add.existing(this);
  }

  static preload (scene) {
    scene.load.image(BACKGROUND_KEY,
      BACKGROUND_SPRITE_PATH
    );
  }
}

export default Background;
