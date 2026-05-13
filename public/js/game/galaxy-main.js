(function initGalaxyScene() {
  const mount = document.getElementById('smartmoons-galaxy-scene');
  if (!mount || !window.Phaser) return;

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'smartmoons-galaxy-scene',
    width: mount.clientWidth || 1080,
    height: 360,
    scene: [window.BootScene, window.PreloadScene, window.GalaxyScene],
    backgroundColor: '#060a13'
  });

  window.smartMoonsGalaxyGame = game;
})();
