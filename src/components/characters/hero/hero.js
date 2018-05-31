import Phaser from 'phaser';

const HERO_KEY = 'hero';
const HERO_SPRITE_PATH = 'src/assets/dude.png';
const LEFT_ANIMATION = 'left';
const RIGHT_ANIMATION = 'right';
const TURN_ANIMATION = 'turn';

class Hero extends Phaser.GameObjects.Sprite {
  constructor (config) {
    super(config.scene, config.x, config.y, HERO_KEY);
    this.initPlayer(config.scene);
  }

  static preload (scene) {
    scene.load.spritesheet(HERO_KEY,
      HERO_SPRITE_PATH,
      { frameWidth: 32, frameHeight: 48 }
    );
  }

  initPlayer (scene) {
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.body.setBounce(0.2);
    this.body.setCollideWorldBounds(true);
    this.body.setGravityY(300);
  }

  moveToLeft () {
    this.body.setVelocityX(-160);
    this.anims.play(LEFT_ANIMATION, true);
  }

  moveToRight () {
    this.body.setVelocityX(160);
    this.anims.play(RIGHT_ANIMATION, true);
  }

  jump () {
    this.body.setVelocityY(-500);
  }

  turn () {
    this.body.setVelocityX(0);
    this.anims.play(TURN_ANIMATION, true);
  }

  static initAnimations (scene) {
    scene.anims.create({
      key: LEFT_ANIMATION,
      frames: scene.anims.generateFrameNumbers(HERO_KEY, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: TURN_ANIMATION,
      frames: [{ key: HERO_KEY, frame: 4 }],
      frameRate: 20
    });
    scene.anims.create({
      key: RIGHT_ANIMATION,
      frames: scene.anims.generateFrameNumbers(HERO_KEY, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

  update () {
    let cursors = this.scene.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.moveToLeft();
    } else if (cursors.right.isDown) {
      this.moveToRight();
    } else {
      this.turn();
    }
    if (cursors.up.isDown && this.body.touching.down) {
      this.jump();
    }
  }
}

export default Hero;
