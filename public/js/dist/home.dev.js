"use strict";

var inactivityTime = function inactivityTime(inactivityDuration) {
  var time;

  var logoutMeOut = function logoutMeOut() {
    logout();
  };

  var resetTimer = function resetTimer() {
    clearTimeout(time);
    time = setTimeout(logoutMeOut, inactivityDuration);
  };

  window.addEventListener("load", resetTimer);
  document.addEventListener("mousemove", resetTimer);
  document.addEventListener("keypress", resetTimer);
};

window.addEventListener("load", function () {
  inactivityTime(600000);
});
//# sourceMappingURL=home.dev.js.map
