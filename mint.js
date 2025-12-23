/* global ethers */
console.log("🔥 mint.js LOADED — PUNK TANG CLAN");

const CONTRACT = "0x4143e221e275FbA1D9c220bD63B5e93c48ed84F3";
const MAX_SUPPLY = 20000;
const PRICE_WEI = 50000000000000n; // 0.00005 ETH

const RPC = "https://mainnet.base.org";

const ABI = [
  "function totalMinted() view returns (uint256)",
  "function currentIndex() view returns (uint256)",
  "function mint(uint256 quantity) payable"
];

const el = id => document.getElementById(id);

let readProvider;
let writeProvider;
let signer;
let contractRead;
let contractWrite;

function updateProgress(minted) {
  const pct = Math.min(100, minted / MAX_SUPPLY * 100);
  el("mintedCount").textContent = minted;
  el("progressFill").style.width = pct + "%";
  el("progressPercent").textContent = pct.toFixed(2) + "%";

  if (el("statsMinted")) el("statsMinted").textContent = minted;
  if (el("statsRemaining")) el("statsRemaining").textContent = MAX_SUPPLY - minted;
}

async function loadStats() {
  try {
    const minted =
      await contractRead.totalMinted().catch(async () =>
        Number(await contractRead.currentIndex())
      );

    updateProgress(Number(minted));
    el("status").textContent = "LIVE STATS ✓";
  } catch {
    el("status").textContent = "Stats unavailable";
  }
}

async function connect() {
  writeProvider = new ethers.BrowserProvider(window.ethereum);
  await writeProvider.send("eth_requestAccounts", []);
  signer = await writeProvider.getSigner();
  contractWrite = new ethers.Contract(CONTRACT, ABI, signer);
  el("btnConnect").disabled = true;
  el("btnMint").disabled = false;
}

async function mint() {
  const qty = Math.max(1, Number(el("qty").value));
  const value = PRICE_WEI * BigInt(qty);

  try {
    el("status").textContent = "Confirm mint in wallet…";
    const tx = await contractWrite.mint(qty, { value });
    await tx.wait();
    el("status").textContent = "Mint successful ✓";
    loadStats();
  } catch {
    el("status").textContent = "Mint failed";
  }
}

window.onload = async () => {
  readProvider = new ethers.JsonRpcProvider(RPC);
  contractRead = new ethers.Contract(CONTRACT, ABI, readProvider);

  loadStats();
  setInterval(loadStats, 15000);

  el("btnConnect").onclick = connect;
  el("btnMint").onclick = mint;

  el("plus").onclick = () => el("qty").value++;
  el("minus").onclick = () => el("qty").value = Math.max(1, el("qty").value - 1);
};
