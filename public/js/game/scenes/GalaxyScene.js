class GalaxyScene extends Phaser.Scene {
  constructor() {
    super('GalaxyScene');
    this.positions = [];
    this.positionNodes = [];
    this.selectedNode = null;
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'bg-starfield').setDisplaySize(width, height).setAlpha(0.92);

    this.title = this.add.text(16, 12, 'Galaxiekarte lädt…', { fontSize: '14px', color: '#bdefff' }).setDepth(10);
    this.linkLayer = this.add.graphics();
    this.nodeLayer = this.add.container(0, 0);
    this.fleetLayer = this.add.container(0, 0);
    this.uiLayer = this.add.container(0, 0).setDepth(30);

    this.cameras.main.setZoom(1);
    this.input.on('wheel', (_, __, ___, deltaY) => {
      this.cameras.main.setZoom(Phaser.Math.Clamp(this.cameras.main.zoom - deltaY * 0.0008, 0.7, 1.8));
    });

    this.createContextPanel();
    this.loadGalaxy();
    this.time.addEvent({ delay: 12000, loop: true, callback: () => this.loadFleets() });
  }

  createContextPanel() {
    const x = 16;
    const y = 36;

    const panel = this.add.rectangle(x, y, 270, 116, 0x081826, 0.92).setOrigin(0, 0).setStrokeStyle(1, 0x67d6ff, 0.7);
    const label = this.add.text(x + 12, y + 8, 'Planet auswählen', { fontSize: '13px', color: '#d6f3ff' });

    const buttons = [
      { text: 'Spionage', mission: 6 },
      { text: 'Angriff', mission: 1 },
      { text: 'Transport', mission: 3 }
    ];

    this.contextButtons = buttons.map((btn, i) => {
      const by = y + 36 + i * 24;
      const r = this.add.rectangle(x + 12, by, 110, 20, 0x14354f, 0.95).setOrigin(0, 0).setStrokeStyle(1, 0x7be3ff, 0.35).setInteractive({ useHandCursor: true });
      const t = this.add.text(x + 18, by + 3, btn.text, { fontSize: '12px', color: '#c8eeff' });
      r.on('pointerdown', () => this.executeFleetMission(btn.mission));
      return { r, t };
    });

    this.contextPanel = { panel, label };
    this.setContextEnabled(false);
  }

  setContextEnabled(enabled, title = 'Planet auswählen') {
    const alpha = enabled ? 1 : 0.45;
    this.contextPanel.panel.setAlpha(alpha);
    this.contextPanel.label.setText(title).setAlpha(alpha);
    this.contextButtons.forEach(({ r, t }) => { r.setAlpha(alpha); t.setAlpha(alpha); });
  }

  async loadGalaxy() {
    try {
      const data = await window.SmartMoonsApi.request('galaxy', {
        params: {
          galaxy: Number((window.SmartMoonsGalaxyCoords && window.SmartMoonsGalaxyCoords.galaxy) || 1),
          system: Number((window.SmartMoonsGalaxyCoords && window.SmartMoonsGalaxyCoords.system) || 1)
        }
      });

      this.positions = data.positions || [];
      this.title.setText(`Galaxie ${data.galaxy} • System ${data.system} • Objekte ${this.positions.length}`);
      this.renderPositions(this.positions);
      this.loadFleets();
    } catch (error) {
      this.title.setText(`Galaxiekarte Fehler: ${error.message}`);
    }
  }

  renderPositions(positions) {
    this.nodeLayer.removeAll(true);
    this.linkLayer.clear();
    this.positionNodes = [];

    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2 + 20;

    positions.forEach((entry, idx) => {
      const angle = Phaser.Math.DegToRad((idx / Math.max(1, positions.length)) * 360);
      const radius = 90 + (idx % 6) * 30;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius * 0.62;

      if (idx > 0) {
        const prev = this.positionNodes[idx - 1];
        this.linkLayer.lineStyle(1, 0x2e6f97, 0.55);
        this.linkLayer.strokeLineShape(new Phaser.Geom.Line(prev.x, prev.y, x, y));
      }

      const node = this.add.circle(x, y, 8, 0x6ee7ff, 0.9)
        .setStrokeStyle(2, 0xd4f6ff, 0.8)
        .setInteractive({ useHandCursor: true });

      node.on('pointerover', () => this.title.setText(`${entry.name} • ${entry.username || 'Unbekannt'} • Position ${entry.planet}`));
      node.on('pointerout', () => this.title.setText(`Galaxiekarte • ${positions.length} Objekte`));
      node.on('pointerdown', () => this.selectNode(entry, node));

      this.positionNodes.push({ id: entry.id, planet: entry.planet, x, y, node });
      this.nodeLayer.add(node);
    });
  }

  selectNode(entry, node) {
    if (this.selectedNode) {
      this.selectedNode.setFillStyle(0x6ee7ff, 0.9);
    }
    this.selectedNode = node;
    this.selectedEntry = entry;
    node.setFillStyle(0xffde8a, 1);
    this.setContextEnabled(true, `${entry.name} • [${entry.planet}]`);
  }

  async loadFleets() {
    try {
      const data = await window.SmartMoonsApi.request('fleets', { params: { limit: 20 } });
      this.renderFleetMarkers((data.fleets || []).slice(0, 12));
    } catch (_) {
      this.renderFleetMarkers([]);
    }
  }

  renderFleetMarkers(fleets) {
    this.fleetLayer.removeAll(true);
    if (!this.positionNodes.length) return;

    fleets.forEach((fleet, idx) => {
      const from = this.positionNodes[idx % this.positionNodes.length];
      const to = this.positionNodes[(idx + 2) % this.positionNodes.length];
      if (!from || !to) return;

      const dot = this.add.circle(from.x, from.y, 3, 0xff9f4a, 1);
      this.fleetLayer.add(dot);
      this.tweens.add({ targets: dot, x: to.x, y: to.y, duration: 5000 + idx * 250, repeat: -1, yoyo: true, ease: 'Sine.inOut' });
    });
  }

  executeFleetMission(mission) {
    if (!this.selectedEntry) return;
    const g = (window.SmartMoonsGalaxyCoords && window.SmartMoonsGalaxyCoords.galaxy) || 1;
    const s = (window.SmartMoonsGalaxyCoords && window.SmartMoonsGalaxyCoords.system) || 1;
    const p = this.selectedEntry.planet;
    window.location.href = `game.php?page=fleetTable&galaxy=${g}&system=${s}&planet=${p}&planettype=1&target_mission=${mission}`;
  }
}

window.GalaxyScene = GalaxyScene;
