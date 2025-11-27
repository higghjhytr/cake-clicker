window.onload = function() {
  // Load saved data or default
  let data = JSON.parse(localStorage.getItem('cakeClickerData')) || {};

  let score = data.score || 0;
  let clickPower = data.clickPower || 1;
  let upgradeCost = data.upgradeCost || 20;

  let farmCount = data.farmCount || 0;
  let farmCost = data.farmCost || 50;

  let farmHelperCount = data.farmHelperCount || 0;
  let farmHelperCost = data.farmHelperCost || 100;

  let factoryCount = data.factoryCount || 0;
  let factoryCost = data.factoryCost || 200;

  let factoryHelperCount = data.factoryHelperCount || 0;
  let factoryHelperCost = data.factoryHelperCost || 500;

  let rebirthBonus = data.rebirthBonus || 0; // % bonus to cakes

  // Elements
  const scoreEl = document.getElementById("score");
  const mainButton = document.getElementById("mainButton");
  const upgradeBtn = document.getElementById("upgradeBtn");
  const farmBtn = document.getElementById("farmBtn");
  const farmHelperBtn = document.getElementById("farmHelperBtn");
  const factoryBtn = document.getElementById("factoryBtn");
  const factoryHelperBtn = document.getElementById("factoryHelperBtn");
  const rebirthBtn = document.getElementById("rebirthBtn");

  const upgradeCostEl = document.getElementById("upgradeCost");
  const farmCostEl = document.getElementById("farmCost");
  const farmHelperCostEl = document.getElementById("farmHelperCost");
  const factoryCostEl = document.getElementById("factoryCost");
  const factoryHelperCostEl = document.getElementById("factoryHelperCost");

  const farmCountEl = document.getElementById("farmCount");
  const farmHelperCountEl = document.getElementById("farmHelperCount");
  const factoryCountEl = document.getElementById("factoryCount");
  const factoryHelperCountEl = document.getElementById("factoryHelperCount");
  const rebirthBonusEl = document.getElementById("rebirthBonus");

  function addCakes(amount) {
    score += Math.floor(amount * (1 + rebirthBonus / 100));
  }

  // Bake Cake button
  mainButton.addEventListener("click", () => {
    addCakes(clickPower);
    updateScore();
  });

  // Upgrade Bake Power
  upgradeBtn.addEventListener("click", () => {
    if(score >= upgradeCost){
      score -= upgradeCost;
      clickPower++;
      upgradeCost = Math.floor(upgradeCost * 1.5);
      updateScore();
    }
  });

  // Buy Cake Farm
  farmBtn.addEventListener("click", () => {
    if(score >= farmCost){
      score -= farmCost;
      farmCount++;
      farmCost = Math.floor(farmCost * 1.6);
      updateScore();
    }
  });

  // Hire Farm Helper
  farmHelperBtn.addEventListener("click", () => {
    if(score >= farmHelperCost){
      score -= farmHelperCost;
      farmHelperCount++;
      farmHelperCost = Math.floor(farmHelperCost * 1.7);
      updateScore();
    }
  });

  // Build Cake Factory
  factoryBtn.addEventListener("click", () => {
    if(score >= factoryCost){
      score -= factoryCost;
      factoryCount++;
      factoryCost = Math.floor(factoryCost * 1.7);
      updateScore();
    }
  });

  // Hire Factory Helper
  factoryHelperBtn.addEventListener("click", () => {
    if(score >= factoryHelperCost){
      score -= factoryHelperCost;
      factoryHelperCount++;
      factoryHelperCost = Math.floor(factoryHelperCost * 1.8);
      updateScore();
    }
  });

  // Rebirth button
  rebirthBtn.addEventListener("click", () => {
    if(score >= 1000){
      rebirthBonus += 10; // +10% bonus per rebirth
      score = 0;
      clickPower = 1;
      upgradeCost = 20;
      farmCount = 0; farmCost = 50; farmHelperCount = 0; farmHelperCost = 100;
      factoryCount = 0; factoryCost = 200; factoryHelperCount = 0; factoryHelperCost = 500;
      updateScore();
      alert("Rebirth successful! +" + rebirthBonus + "% bonus to all cakes!");
    } else {
      alert("You need at least 1000 cakes to rebirth!");
    }
  });

  // Auto-generating cakes every second
  setInterval(() => {
    addCakes(farmCount * 1 + farmHelperCount * 3 + factoryCount * 5 + factoryHelperCount * 15);
    updateScore();
  }, 1000);

  function updateScore(){
    scoreEl.innerText = "Cakes: " + score;
    upgradeCostEl.innerText = upgradeCost;
    farmCostEl.innerText = farmCost;
    farmHelperCostEl.innerText = farmHelperCost;
    factoryCostEl.innerText = factoryCost;
    factoryHelperCostEl.innerText = factoryHelperCost;

    farmCountEl.innerText = farmCount;
    farmHelperCountEl.innerText = farmHelperCount;
    factoryCountEl.innerText = factoryCount;
    factoryHelperCountEl.innerText = factoryHelperCount;

    rebirthBonusEl.innerText = "Rebirth Bonus: " + rebirthBonus + "%";
    saveGame();
  }

  // Save game every 5 seconds
  function saveGame(){
    const saveData = {
      score, clickPower, upgradeCost,
      farmCount, farmCost, farmHelperCount, farmHelperCost,
      factoryCount, factoryCost, factoryHelperCount, factoryHelperCost,
      rebirthBonus
    };
    localStorage.setItem('cakeClickerData', JSON.stringify(saveData));
  }

  setInterval(saveGame, 5000);

  updateScore();
}
let bankCount = 0;
let bankCost = 500;
let bankWorkerCount = 0;
let bankWorkerCost = 200;

const bankBtn = document.getElementById("bankBtn");
const bankCostEl = document.getElementById("bankCost");
const bankCountEl = document.getElementById("bankCount");

const bankWorkerBtn = document.getElementById("bankWorkerBtn");
const bankWorkerCostEl = document.getElementById("bankWorkerCost");
const bankWorkerCountEl = document.getElementById("bankWorkerCount");

// Build Bank
bankBtn.addEventListener("click", () => {
  if(score >= bankCost){
    score -= bankCost;
    bankCount++;
    bankCost = Math.floor(bankCost * 1.7);
    updateScore();
  }
});

// Hire Bank Worker
bankWorkerBtn.addEventListener("click", () => {
  if(score >= bankWorkerCost){
    score -= bankWorkerCost;
    bankWorkerCount++;
    bankWorkerCost = Math.floor(bankWorkerCost * 1.6);
    updateScore();
  }
});

// Add bank production to auto-cake generation
setInterval(() => {
  addCakes(bankCount * 5 + bankWorkerCount * 15); // Banks = 5/sec, Workers = 15/sec
  updateScore();
}, 1000);

// Update the display inside updateScore
function updateScore(){
  // existing updateScore code...
  bankCostEl.innerText = bankCost;
  bankCountEl.innerText = bankCount;

  bankWorkerCostEl.innerText = bankWorkerCost;
  bankWorkerCountEl.innerText = bankWorkerCount;

  // rest of your updateScore logic
}
