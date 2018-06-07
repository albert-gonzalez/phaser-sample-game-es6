import Phaser from 'phaser';

const BOMB_KEY = 'bomb';
const BOMB_SPRITE_PATH = 'src/assets/bomb.png';

class Bombs {
  constructor (config) {
    this.initBombs(config);
  }

  static preload (scene) {
    scene.load.image(BOMB_KEY,
      BOMB_SPRITE_PATH
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
