const nodesArray = [
{NodeName:"Inteleptul",NodeAddress:"0x58122A9f23E70061a1FD40A13a2C1F66c903dd0e"},
{NodeName:"Bucurosul",NodeAddress:"0xa470BF88347069357C7DdE1c3E0361545190d2AE"},
{NodeName:"Rusinosul",NodeAddress:"0x39850112fc6e37a57d319E2Df0ED04e55cAF79dE"},
{NodeName:"Somnorosul",NodeAddress:"0xefd56A69982Ef193224003131Ad87c7F30F0EA68"},
{NodeName:"Hap-Ciu",NodeAddress:"0xB2Bf540aA296513c04B042868d62EDC2c25F2384"},
{NodeName:"Morocanosul",NodeAddress:"0x2b2284a227343480747661593fCc610D804fFbDD"},
{NodeName:"Mutulica Y",NodeAddress:"0xf6F6b36112AA3666FB1C64d8A15db2238E76dD33"},
{NodeName:"Galagie",NodeAddress:"0xe785E23708A8060bbE48f39d1f76ec93D11F57BE"},
{NodeName:"Nod16",NodeAddress:"0x2419136d950221317637aD074F4Cde0f21F57e3a"},
{NodeName:"Nod17",NodeAddress:"0x98876131D349d8B975acDb80168C7d856C94AbCA"},
{NodeName:"Nod18",NodeAddress:"0xCe1FE44fbe18A6b5d1221FDC80B4079297f6a217"},
{NodeName:"Nod19",NodeAddress:"0xC51B744C11cA015df272F432C23aA8A6ef390035"},
{NodeName:"Reward3",NodeAddress:"0x60c0341cfb542a0e7a171cfe64c21ea256b4b43a"},
{NodeName:"Nodurosu' Y",NodeAddress:"0x75B04096DB9BE141c76b6667a34E1f07dA1D52d7"},
{NodeName:"Vorbaretul",NodeAddress:"0x7EFdcF8Dba44cEc39180a3794daBcFcd9Cae3D7B"},
{NodeName:"Norocosul",NodeAddress:"0x27D50A5C826Fca1eC52a7612B34F4BeF25E23953"},
{NodeName:"To be, or not to be?",NodeAddress:"0x7Af198412C2D1484776BfA23FdB6Cf27c2Bb7C26"},
{NodeName:"Last but not least Y",NodeAddress:"0x8BBaB346DC094b02Ca7a5448650621CCb56046b1"},
{NodeName:"Fourteen",NodeAddress:"0x174ED2dF4FceBb52ed96F159Efe9078a8Da8D61D"},
{NodeName:"Onanistu'",NodeAddress:"0x84A4C40F0930E43f77FbF475Da8703986574c101"},
{NodeName:"Nod20",NodeAddress:"0x98BC05C76F6a3189A0170D524BDa4fB064A56FFA"},
{NodeName:"Nod21",NodeAddress:"0xf3F3b8C0A2d9b71CaA5EBbFd178c30708c436ff5"},
{NodeName:"Node22",NodeAddress:"0x0b20ce071919b6Ae04a804EC403A7D2aC12C5878"},
{NodeName:"Node23",NodeAddress:"0xC59F28fcecA146254Cf9f3BbAA2f52dCfE87Dae7"},
{NodeName:"Node24",NodeAddress:"0x0D04A83f91A593D0a8edbD5BfC9e34CDD87Aa458"},
{NodeName:"Reward 1",NodeAddress:"0x8e1bf8aD4EAc37C1F9Ff8f22661fFB12DfD508a1"},
{NodeName:"Reward 2",NodeAddress:"0x55E81C41105f53601EcAFB08592102e1DFDB1836"},
{NodeName:"Node25",NodeAddress:"0x6c93409ABC91D6D4566AbeCbBf0c8ac5aB8f3fCB"},
{NodeName:"Node26",NodeAddress:"0x19cdBce91D879d5F380B26d932b01bD8b4280Ff8"},
{NodeName:"Node27",NodeAddress:"0x09E4A5bA79C4E712270f46efFc976491731DBC1d"},
{NodeName:"Node28",NodeAddress:"0x2724B8DA07bF1e472B6ac6eCb48197dC924733Ac"},
{NodeName:"Node29",NodeAddress:"0x11ef241346cA7b73c8Ba0a73Fdd19DbDD89919F4"},
{NodeName:"Node30",NodeAddress:"0x5DEC84ce39231B9123613aC92e431a09c7b973D3"},
{NodeName:"Node31",NodeAddress:"0x38ec238748EDec81F8E300C6CD51594434cb2AC4"},
{NodeName:"Node32",NodeAddress:"0xF7E81d96251C6C2b6296FF0585C24793c8a10D40"},
{NodeName:"Node33",NodeAddress:"0x8b125E0b1cDA57758f80398d68072ACa8d93E75F"},
{NodeName:"Node34",NodeAddress:"0xdC8789b462A6Adc8253593825E927ed938b326da"},
{NodeName:"Node35",NodeAddress:"0x395f541685d738768a1588Ff208990fae6dc7a1a"},
{NodeName:"Node36",NodeAddress:"0x262FfAD333A9D319126FeEB8aA74f350B8f0b237"}
];

async function fetchTransactions(node) {
  try {
    const response = await fetch(`https://blockexplorer.bloxberg.org/api?module=account&action=txlist&address=${node.NodeAddress}`);
    const { result: nodeTransactionsArray } = await response.json();
    if (nodeTransactionsArray.length > 0) {
      const lastTransactionTime = Math.round((Date.now() / 1000 - nodeTransactionsArray[0].timeStamp) / 3600);
      return { ...node, lastTransactionTime };
    }
  } catch (error) {
    console.log(error);
  }
}

(function () {
  const script = document.createElement("script");
  script.src = "script.js";
  script.setAttribute("rel", "preload");
  script.setAttribute("as", "script");
  document.head.appendChild(script);
})();

window.addEventListener("DOMContentLoaded", async function () {
  const nodesWithTransactions = await Promise.all(nodesArray.map(fetchTransactions));
  const tbodyRef = document.querySelector("#myTable tbody");
  for (const node of nodesWithTransactions) {
    const newRow = tbodyRef.insertRow();
    const newNodeNameCell = newRow.insertCell();
    const newNodeAddressCell = newRow.insertCell();
    const newTransactionTimeCell = newRow.insertCell();
    newNodeNameCell.textContent = node.NodeName;
    const newNodeAddressText = window.innerWidth < window.innerHeight ? `${node.NodeAddress.substr(0, 5)}...${node.NodeAddress.substr(-5)}` : node.NodeAddress;
    const newNodeAddressLink = document.createElement("a");
    newNodeAddressLink.href = `https://blockexplorer.bloxberg.org/address/${node.NodeAddress}`;
    newNodeAddressLink.textContent = newNodeAddressText;
    newNodeAddressCell.appendChild(newNodeAddressLink);
    newTransactionTimeCell.textContent = node.lastTransactionTime || "Last hour";
    if (node.lastTransactionTime > 20) {
      newTransactionTimeCell.classList.add("red-text");
    }
  }
})();
