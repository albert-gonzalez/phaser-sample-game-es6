const PLATFORM_KEY = 'ground';
const PLATFORM_SPRITE_PATH = 'src/assets/platform.png';

class Platforms {
  constructor (config) {
    this.initPlatforms(config);
  }

  static preload (scene) {
    scene.load.image(PLATFORM_KEY,
      PLATFORM_SPRITE_PATH
    );
  }

  initPlatforms ({ scene, positions }) {
    this.platforms = scene.physics.add.staticGroup();
    positions.forEach((position) => this.createPosition(position));
  }

  createPosition ({x, y, scale = 1}) {
    let platform = this.platforms.create(x, y, PLATFORM_KEY);

    if (scale !== 1) {
      platform.setScale(scale).refreshBody();
    }
  }

  getGroup () {
    return this.platforms;
  }
}

export default Platforms;
