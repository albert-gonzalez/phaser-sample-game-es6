import Phaser from 'phaser';
import Hero from '../components/characters/hero/hero';

let platforms;
let player;
let stars;
let score = 0;
let scoreText;
let bombs;

class Game extends Phaser.Scene {
  constructor () {
    super({
      key: 'Game'
    });
  }

  preload () {
    console.log('preload');
    this.load.image('sky', 'src/assets/sky.png');
    this.load.image('ground', 'src/assets/platform.png');
    this.load.image('star', 'src/assets/star.png');
    this.load.image('bomb', 'src/assets/bomb.png');

    Hero.preload(this);
  }

  create () {
    this.gameover = false;
    createBackground(this);
    platforms = createPlatforms(this);
    player = createPlayer(this);
    stars = createStars(this);
    bombs = this.physics.add.group();
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    initPhysics({bombs, player, platforms, stars, phaser: this});
    createBomb(player);
    Hero.initAnimations(this);
  }

  update () {
    player.update();

    if (this.gameover) {
      setTimeout(() => goToGameOver(this), 1000);
      this.scene.pause();
    }
  }
};

function goToGameOver (phaser) {
  phaser.scene.start('GameOver');
}

function initPhysics ({player, platforms, stars, bombs, phaser}) {
  phaser.physics.add.collider(player, platforms);
  phaser.physics.add.collider(stars, platforms);
  phaser.physics.add.overlap(player, stars, collectStar, null, phaser);
  phaser.physics.add.collider(bombs, platforms);
  phaser.physics.add.collider(player, bombs, hitBomb, null, phaser);
}

function createStars (phaser) {
  let stars = phaser.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });
  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  return stars;
}

function createPlayer (phaser) {
  let player = new Hero({scene: phaser, x: 100, y: 450});

  return player;
}

function createBackground (phaser) {
  phaser.add.image(400, 300, 'sky');
}

function createPlatforms (phaser) {
  let platforms;

  platforms = phaser.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  return platforms;
}

function collectStar (player, star) {
  hideStar(star);
  updateScore();

  if (levelCompleted()) {
    showStars(stars);
    createBomb(player);
  }
}

function levelCompleted () {
  return stars.countActive(true) === 0;
}

function hideStar (star) {
  star.disableBody(true, true);
}

function updateScore () {
  score += 10;
  scoreText.setText('Score: ' + score);
}

function createBomb (player) {
  var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
  var bomb = bombs.create(x, 16, 'bomb');
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  bomb.allowGravity = false;
}

function showStars (stars) {
  stars.children.iterate(function (child) {
    child.enableBody(true, child.x, 0, true, true);
  });
}

function hitBomb (player, bomb) {
  player.setTint(0xde0000);
  player.anims.play('turn');
  this.gameover = true;
}

export default Game;
