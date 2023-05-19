const nodesArray = [

{NodeName:"Mutulica",NodeAddress:"0xf6F6b36112AA3666FB1C64d8A15db2238E76dD33"},
{NodeName:"Bucurosul",NodeAddress:"0xa470BF88347069357C7DdE1c3E0361545190d2AE"},
{NodeName:"Galagie",NodeAddress:"0xe785E23708A8060bbE48f39d1f76ec93D11F57BE"},
{NodeName:"Fourteen",NodeAddress:"0x174ED2dF4FceBb52ed96F159Efe9078a8Da8D61D"},
{NodeName:"Nodurosu' Y",NodeAddress:"0x75B04096DB9BE141c76b6667a34E1f07dA1D52d7"},
{NodeName:"Nod16",NodeAddress:"0x2419136d950221317637aD074F4Cde0f21F57e3a"},
{NodeName:"Inteleptul",NodeAddress:"0x58122A9f23E70061a1FD40A13a2C1F66c903dd0e"},


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
