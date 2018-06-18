import Phaser from 'phaser';
import sprite from '../../../assets/bomb.png';

const BOMB_KEY = 'bomb';

class Bombs {
  constructor (config) {
    this.initBombs(config);
  }

  static preload (scene) {
    scene.load.image(BOMB_KEY,
      sprite
    );
  }

  initBombs ({ scene, ...config }) {
    this.bombs = scene.physics.add.group();
  }

  getGroup () {
    return this.bombs;
  }

  create ({x, y}) {
    let bomb = this.bombs.create(x, y, BOMB_KEY);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
  }

  countActive () {
    return this.bombs.countActive(true);
  }
}

export default Bombs;
