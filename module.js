(() => { })();

Hooks.on('init', () => {

    game.settings.register('streaming-mode', 'centerOnSceneChange', {
      name: game.i18n.localize("SM.CONFIG.CenterOnChange"),
      hint: "",
      scope: 'client',
      config: true,
      default: true,
      type: Boolean,
    });
  });

Hooks.on("canvasReady", (sceneNav, html, data) => {
    if (game.settings.get("streaming-mode", "centerOnSceneChange")) {
      if (canvas.dimensions.sceneWidth > canvas.dimensions.sceneHeight) {
        canvas.pan({ x: canvas.dimensions.width / 2, y: canvas.dimensions.height / 2, scale: (window.innerWidth  / canvas.dimensions.sceneWidth) - 0.0});
      }
      else {
        canvas.pan({ x: canvas.dimensions.width / 2, y: canvas.dimensions.height / 2, scale: (window.innerHeight / canvas.dimensions.sceneHeight) - 0.0});
      }
    }
});
