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

  game.settings.register('streaming-mode', 'autoSwapScenesToMostViewers', {
    name: game.i18n.localize("SM.CONFIG.AutoSwapScenesToMostViewers"),
    hint: "",
    scope: 'client',
    config: true,
    default: false,
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

Hooks.on("ready", () => {

  Hooks.on("renderSceneNavigation", () => {
    if (game.settings.get("streaming-mode", "autoSwapScenesToMostViewers"))
    {
      let sceneViews = {};
  
      for (let x=0; x <= game.users.entities.length; x++)
      {
        let user = game.users.entities[x];
        if (user?.viewedScene)
        {
          if (sceneViews[user.viewedScene] == undefined)
          {
            sceneViews[user.viewedScene] = 0;
          }
  
          sceneViews[user.viewedScene]++;
        }
      }

      let mostViewedId = '';
      let mostViewedCnt = 0;
      let keys = Object.keys(sceneViews);
      for (let x = 0; x <= keys.length; x++) {
        let sceneId = keys[x];
        if (sceneViews[sceneId] > mostViewedCnt)
        {
          mostViewedCnt = sceneViews[sceneId];
          mostViewedId = sceneId;
        }
      }

      game.scenes.get(mostViewedId).view();
    }
  });

});
