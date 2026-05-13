(function initSmartMoonsLoginGame() {
  if (!window.Phaser || !document.getElementById('smartmoons-login-game')) return;

  const cfg = Object.assign({}, window.SmartMoonsGameConfig, {
    scene: [window.BootScene, window.PreloadScene, window.LoginBackgroundScene]
  });

  window.smartMoonsLoginGame = new Phaser.Game(cfg);

  window.addEventListener('resize', () => {
    if (!window.smartMoonsLoginGame) return;
    const w = window.innerWidth;
    const h = 420;
    window.smartMoonsLoginGame.scale.resize(w, h);
  });
})();
