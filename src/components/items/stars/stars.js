import Phaser from 'phaser';
import sprite from '../../../assets/star.png';

const STAR_KEY = 'star';

class Stars {
  constructor (config) {
    this.initStars(config);
  }

  static preload (scene) {
    scene.load.image(STAR_KEY,
      sprite
    );
  }

  initStars ({ scene, ...config }) {
    this.stars = scene.physics.add.group(config);
    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
  }

  getGroup () {
    return this.stars;
  }

  countActive () {
    return this.stars.countActive(true);
  }

  show () {
    this.stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });
  }
}

export default Stars;
