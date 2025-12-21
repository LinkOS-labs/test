const LIVE = {
  CONTRACT: null,
  REFRESH: 60000
};

function comingSoon() {
  ["liveHolders","liveMinted","liveFloor","liveVolume"]
    .forEach(id => document.getElementById(id).textContent = "COMING SOON");
}

function updateLive() {
  if (!LIVE.CONTRACT) {
    comingSoon();
    return;
  }
  // Hook BaseScan / marketplace here when ready
}

updateLive();
setInterval(updateLive, LIVE.REFRESH);
