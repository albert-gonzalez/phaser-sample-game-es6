import Phaser from 'phaser';

let platforms;
let player;
let stars;
let score = 0;
let scoreText;
let bombs;
let cursors;
let gameOver;

class Game extends Phaser.Scene {
  constructor (test) {
    super({
      key: 'Game'
    });
  }

  preload () {
    this.load.image('sky', 'src/assets/sky.png');
    this.load.image('ground', 'src/assets/platform.png');
    this.load.image('star', 'src/assets/star.png');
    this.load.image('bomb', 'src/assets/bomb.png');
    this.load.spritesheet('dude',
      'src/assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
  }

  create () {
    createBackground(this);

    platforms = createPlatforms(this);
    player = createPlayer(this);
    stars = createStars(this);
    bombs = this.physics.add.group();
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    initPhysics({bombs, player, platforms, stars, phaser: this});
  }

  update () {
    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-500);
    }
  }
};

function initPhysics ({player, platforms, stars, bombs, phaser}) {
  phaser.physics.add.collider(player, platforms);
  phaser.physics.add.collider(stars, platforms);
  phaser.physics.add.overlap(player, stars, collectStar, null, this);
  phaser.physics.add.collider(bombs, platforms);
  phaser.physics.add.collider(player, bombs, hitBomb, null, this);
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
  let player = phaser.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  initAnimations(phaser);
  player.body.setGravityY(300);

  return player;
}

function initAnimations (phaser) {
  phaser.anims.create({
    key: 'left',
    frames: phaser.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  phaser.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });
  phaser.anims.create({
    key: 'right',
    frames: phaser.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
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
  this.physics.pause();
  player.setTint(0xde0000);
  player.anims.play('turn');
  gameOver = true;
}

export default Game;
