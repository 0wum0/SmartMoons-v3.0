class PreloadScene extends Phaser.Scene {
  constructor() { super('PreloadScene'); }
  async preload() {
    const manifest = await window.SmartMoonsApi.getManifest();
    this.registry.set('assetManifest', manifest);

    this.load.image('bg-starfield', manifest.backgrounds.starfieldDeep);
    this.load.image('planet-terra-01', manifest.sprites.planetTerra01);
    this.load.image('drone-ship-01', manifest.sprites.droneShip01);
    this.load.image('orbit-ring-01', manifest.ui.orbitRing01);
    this.load.image('particle-glow-01', manifest.particles.glowParticle01);
  }
  create() {
    if (document.getElementById('smartmoons-planet-scene')) {
      this.scene.start('PlanetScene');
      return;
    }
    if (document.getElementById('smartmoons-galaxy-scene')) {
      this.scene.start('GalaxyScene');
      return;
    }
    this.scene.start('LoginBackgroundScene');
  }
}
window.PreloadScene = PreloadScene;
