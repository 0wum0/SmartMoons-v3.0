(function initPlanetOverviewScene() {
  if (!window.Phaser || !document.getElementById('smartmoons-planet-scene')) return;

  const config = {
    type: Phaser.AUTO,
    parent: 'smartmoons-planet-scene',
    width: document.getElementById('smartmoons-planet-scene').clientWidth || 760,
    height: 420,
    backgroundColor: '#050814',
    scene: [window.BootScene, window.PreloadScene, window.PlanetScene]
  };

  window.smartMoonsPlanetGame = new Phaser.Game(config);
})();
