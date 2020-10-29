window.disableScroll  = function () {
  document.body.style.cssText = `
    position: relativ;
    overflow: hidden;
    height: 100vh;
  `
}

window.enableScroll = function (){
  document.body.style.cssText = ` `
}