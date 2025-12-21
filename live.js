const LIVE_CONFIG = {
  CONTRACT: null, // put address here later
  REFRESH: 60000
};

function setComingSoon() {
  ["liveHolders","liveMinted","liveFloor","liveVolume"]
    .forEach(id => document.getElementById(id).textContent = "COMING SOON");
}

async function updateLive() {
  if (!LIVE_CONFIG.CONTRACT) {
    setComingSoon();
    return;
  }

  // When contract is live:
  // fetch BaseScan / marketplace data here
}

updateLive();
setInterval(updateLive, LIVE_CONFIG.REFRESH);
