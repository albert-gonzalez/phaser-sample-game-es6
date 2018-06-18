import Phaser from 'phaser';
import Game from '../scenes/game';
import Title from '../scenes/title';
import GameOver from '../scenes/gameOver';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelart: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [
    Title,
    Game,
    GameOver
  ]
};
