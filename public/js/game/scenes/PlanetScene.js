class PlanetScene extends Phaser.Scene {
  constructor() {
    super('PlanetScene');
    this.dragging = false;
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor('#060a16');
    const bg = this.add.tileSprite(width / 2, height / 2, width, height, 'bg-starfield').setAlpha(0.85);

    const world = this.add.container(width / 2, height / 2 + 24);
    const ring = this.add.image(0, 0, 'orbit-ring-01').setScale(0.42).setAlpha(0.7);
    const planet = this.add.image(0, 20, 'planet-terra-01').setScale(0.43);

    world.add([ring, planet]);
    this.tweens.add({ targets: ring, angle: 360, duration: 120000, repeat: -1 });
    this.tweens.add({ targets: planet, y: 28, yoyo: true, duration: 4500, repeat: -1, ease: 'Sine.inOut' });

    const orbitRadius = 210;
    this.slots = [];
    for (let i = 0; i < 6; i++) {
      const a = Phaser.Math.DegToRad(i * 60);
      const x = Math.cos(a) * orbitRadius;
      const y = Math.sin(a) * (orbitRadius * 0.45);
      const slot = this.add.circle(x, y, 14, 0x4dd8ff, 0.35).setStrokeStyle(2, 0x9de8ff, 0.8).setInteractive({ useHandCursor: true });
      slot.on('pointerover', () => slot.setFillStyle(0x89e9ff, 0.8));
      slot.on('pointerout', () => slot.setFillStyle(0x4dd8ff, 0.35));
      slot.on('pointerdown', () => this.showHint(`Bauslot ${i + 1}`));
      world.add(slot);
      this.slots.push(slot);
    }

    const drone = this.add.image(0, -170, 'drone-ship-01').setScale(0.16);
    world.add(drone);
    this.tweens.addCounter({ from: 0, to: 360, duration: 9000, repeat: -1, onUpdate: t => {
      const v = t.getValue();
      drone.x = Math.cos(Phaser.Math.DegToRad(v)) * 180;
      drone.y = Math.sin(Phaser.Math.DegToRad(v)) * 80 - 20;
    }});

    this.hintText = this.add.text(20, 16, 'Planetenansicht aktiv', { fontSize: '14px', color: '#d5f4ff' }).setScrollFactor(0).setDepth(20);
    this.resourceText = this.add.text(20, 38, '', { fontSize: '13px', color: '#91dcff' }).setScrollFactor(0).setDepth(20);

    this.input.on('wheel', (_, __, ___, deltaY) => {
      const zoom = Phaser.Math.Clamp(this.cameras.main.zoom - deltaY * 0.0007, 0.75, 1.8);
      this.cameras.main.setZoom(zoom);
    });

    this.input.on('pointerdown', pointer => { if (pointer.rightButtonDown()) this.dragging = true; });
    this.input.on('pointerup', () => { this.dragging = false; });
    this.input.on('pointermove', pointer => {
      if (!this.dragging) return;
      this.cameras.main.scrollX -= pointer.velocity.x / this.cameras.main.zoom / 10;
      this.cameras.main.scrollY -= pointer.velocity.y / this.cameras.main.zoom / 10;
      bg.tilePositionX += pointer.velocity.x * 0.01;
      bg.tilePositionY += pointer.velocity.y * 0.01;
    });

    this.loadPlanetState();
    this.loadResources();
    this.time.addEvent({ delay: 10000, loop: true, callback: () => this.loadResources() });
  }

  async loadPlanetState() {
    try {
      const data = await window.SmartMoonsApi.getPlanetState();
      const p = data.planet;
      this.showHint(`${p.name} • Felder ${p.field_current}/${p.field_max} • ${p.temp_min}°C bis ${p.temp_max}°C`);
    } catch (_) {}
  }

  async loadResources() {
    try {
      const data = await window.SmartMoonsApi.getResources();
      const r = data.resources;
      this.resourceText.setText(`Metal ${Math.floor(r.metal).toLocaleString('de-DE')} • Kristall ${Math.floor(r.crystal).toLocaleString('de-DE')} • Deuterium ${Math.floor(r.deuterium).toLocaleString('de-DE')}`);
    } catch (_) {}
  }

  showHint(text) {
    this.hintText.setText(text);
  }
}

window.PlanetScene = PlanetScene;
