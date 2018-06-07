import Phaser from 'phaser';
import Hero from '../components/characters/hero/hero';
import Stars from '../components/items/stars/stars';
import Platforms from '../components/scene/platforms/platforms';
import Background from '../components/scene/background/background';
import Bombs from '../components/enemies/bombs/bombs';

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
    Bombs.preload(this);
    Background.preload(this);
    Hero.preload(this);
    Stars.preload(this);
    Platforms.preload(this);
  }

  create () {
    this.gameover = false;
    createBackground(this);
    platforms = createPlatforms(this);
    player = createPlayer(this);
    stars = createStars(this);
    bombs = new Bombs({ scene: this });
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    initPhysics({bombs, player, platforms, stars, phaser: this});
    createBomb(player);
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
  phaser.physics.add.collider(player, platforms.getGroup());
  phaser.physics.add.collider(stars.getGroup(), platforms.getGroup());
  phaser.physics.add.overlap(player, stars.getGroup(), collectStar, null, phaser);
  phaser.physics.add.collider(bombs.getGroup(), platforms.getGroup());
  phaser.physics.add.collider(player, bombs.getGroup(), hitBomb, null, phaser);
}

function createStars (phaser) {
  return new Stars({
    scene: phaser,
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });
}

function createPlayer (phaser) {
  let player = new Hero({scene: phaser, x: 100, y: 450});

  return player;
}

function createBackground (phaser) {
  return new Background({
    scene: phaser,
    x: 400,
    y: 300
  });
}

function createPlatforms (phaser) {
  let platforms;

  platforms = new Platforms({
    scene: phaser,
    positions: [
      {x: 400, y: 568, scale: 2},
      {x: 600, y: 400},
      {x: 50, y: 250},
      {x: 750, y: 220}
    ]
  });

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
  return stars.countActive() === 0;
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
  bombs.create({ x, y: 16 });
}

function showStars (stars) {
  stars.show();
}

function hitBomb (player, bomb) {
  player.setTint(0xde0000);
  player.anims.play('turn');
  this.gameover = true;
}

export default Game;
