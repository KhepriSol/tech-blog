const inactivityTime = (inactivityDuration) => {
    let time;
  
    const logoutMeOut = () => {
      logout();
    };
  
    const resetTimer = () => {
      clearTimeout(time);
      time = setTimeout(logoutMeOut, inactivityDuration);
    };
  
    window.addEventListener("load", resetTimer);
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keypress", resetTimer);
  };
  
  window.addEventListener("load", () => {
    inactivityTime(600000);
  });
  