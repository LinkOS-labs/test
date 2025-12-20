const enter = document.getElementById("enter");
const party = document.getElementById("party");
const btn = document.getElementById("enterBtn");
const bg = document.getElementById("bg");
const crowd = document.getElementById("crowd");
const status = document.getElementById("status");

btn.onclick = () => {
  bg.style.filter = "brightness(1.6)";
  setTimeout(() => bg.style.filter = "brightness(1)", 200);

  enter.classList.add("hidden");
  party.classList.remove("hidden");
};

// mouse light
document.addEventListener("mousemove", e => {
  const x = (e.clientX / innerWidth) * 100;
  const y = (e.clientY / innerHeight) * 100;
  bg.style.background =
    `radial-gradient(circle at ${x}% ${y}%, rgba(0,255,255,0.45), #050505 65%)`;
});

// crowd spawn (VISIBLE)
setInterval(() => {
  const r = document.createElement("div");
  r.className = "raver";
  r.style.left = Math.random() * 100 + "%";
  r.style.animationDuration = 3 + Math.random() * 4 + "s";
  crowd.appendChild(r);
  setTimeout(() => r.remove(), 6000);
}, 220);

// status
const texts = [
  "THE FLOOR IS MOVING",
  "NO SLEEP LEFT",
  "ONE MORE TRACK",
  "WHO ARE YOU",
  "STILL GOING"
];

setInterval(() => {
  const bpm = [124,128,132,138][Math.floor(Math.random()*4)];
  const t = texts[Math.floor(Math.random()*texts.length)];
  status.textContent = `🟢 LIVE · BPM ${bpm} · ${t}`;
}, 3000);
