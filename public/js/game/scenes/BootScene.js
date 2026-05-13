class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }
  preload() {
    const { width, height } = this.scale;
    const barBg = this.add.rectangle(width / 2, height / 2, 360, 20, 0x0c1e35).setStrokeStyle(2, 0x4dc3ff, 0.7);
    const bar = this.add.rectangle(width / 2 - 176, height / 2, 4, 12, 0x6ce3ff).setOrigin(0, 0.5);
    this.load.on('progress', (value) => { bar.width = 352 * value; });
    this.load.on('complete', () => { barBg.destroy(); bar.destroy(); });
  }
  create() { this.scene.start('PreloadScene'); }
}
window.BootScene = BootScene;
