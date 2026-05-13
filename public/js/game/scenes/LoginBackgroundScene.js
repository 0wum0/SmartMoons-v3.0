class LoginBackgroundScene extends Phaser.Scene {
  constructor() { super('LoginBackgroundScene'); }
  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'bg-starfield').setDisplaySize(width, height);

    const ring = this.add.image(width * 0.72, height * 0.53, 'orbit-ring-01').setScale(0.33).setAlpha(0.65);
    const planet = this.add.image(width * 0.72, height * 0.56, 'planet-terra-01').setScale(0.34);

    const droneA = this.add.image(width * 0.60, height * 0.38, 'drone-ship-01').setScale(0.2);
    const droneB = this.add.image(width * 0.83, height * 0.34, 'drone-ship-01').setScale(0.14).setTint(0xaec6ff);

    this.tweens.add({ targets: ring, angle: 360, duration: 90000, repeat: -1 });
    this.tweens.add({ targets: planet, y: planet.y + 8, yoyo: true, duration: 3500, repeat: -1, ease: 'Sine.inOut' });
    this.tweens.add({ targets: [droneA, droneB], alpha: { from: 0.7, to: 1 }, yoyo: true, duration: 1200, repeat: -1 });

    const particles = this.add.particles(width * 0.72, height * 0.56, 'particle-glow-01', {
      speed: { min: 8, max: 20 },
      scale: { start: 0.25, end: 0 },
      alpha: { start: 0.8, end: 0 },
      blendMode: 'ADD',
      lifespan: 2200,
      frequency: 120
    });
    particles.setDepth(5);
  }
}
window.LoginBackgroundScene = LoginBackgroundScene;
