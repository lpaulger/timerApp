'use strict';
function onDeviceReady() {
  if (parseFloat(window.device.version) === 7) {
    document.body.className = document.body.className + ' phone-toolbar-spacing';
  }
}
document.addEventListener('deviceready', onDeviceReady, false);
angular.bootstrap(document.getElementsByTagName('body')[0], ['timerApp']);