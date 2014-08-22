/*globals device */
'use strict';

function onDeviceReady() {
  if (parseFloat(device.version) === 7.0) {
    document.body.className = document.body.className + ' phone-toolbar-spacing';
  }
  angular.bootstrap(document.getElementsByTagName('body')[0], ['timerApp']);
}

document.addEventListener('deviceready', onDeviceReady, false);
