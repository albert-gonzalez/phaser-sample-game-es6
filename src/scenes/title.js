import Phaser from 'phaser';
import config from '../config/config';

class Title extends Phaser.Scene {
  constructor () {
    super({
      key: 'Title'
    });
  }

  create () {
    this.addTextToTheScene();
  }

  update () {
    this.listenInput();
  };

  listenInput () {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.space.isDown) {
      this.scene.start('Game');
    }
  }

  addTextToTheScene () {
    createText({
      label: 'ES6 Game',
      x: config.width / 2,
      y: config.height * 0.20,
      fill: '#FE0',
      fontSize: '32px',
      scene: this
    });

    createText({
      label: 'Press space key',
      x: config.width / 2,
      y: config.height * 0.45,
      fill: '#FFF',
      fontSize: '22px',
      scene: this
    });
  }
}

const createText = ({label, x, y, scene, ...props}) => {
  const text = scene.add.text(
    x,
    y,
    label,
    props
  );

  text.setPosition(x - text.width / 2, y - text.height / 2);

  return text;
};
export default Title;
