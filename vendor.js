const monsterHealthBar = document.getElementById("monster-health");
const playerHealthBar = document.getElementById("player-health");
const playerStaminaBar = document.getElementById("player-stamina");
const totalmoney = document.getElementById("player-cash");
const bonusLifeEl = document.getElementById("bonus-life");

const attackBtn = document.getElementById("attack-btn");
const strongAttackBtn = document.getElementById("strong-attack-btn");
const healBtn = document.getElementById("heal-btn");
const staminaBTN = document.getElementById("stamina-btn");
const logBtn = document.getElementById("log-btn");

function adjustHealthBars(maxLife) {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

function adjustStaminaBars(maxStamina) {
  playerStaminaBar.max = maxStamina;
  playerStaminaBar.vale = maxStamina;
}

function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function staminaCost(stamina) {
  const staminaCost = Math.random() * stamina;
  playerStaminaBar.value = +playerStaminaBar.value - staminaCost;
  return staminaCost;
}

function spendMoney(cost) {
  const moneySpent = cost;
  totalmoney.value = +totalmoney.value - moneySpent;
  return moneySpent;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}

function increasePlayerStamina(staminaValue) {
  playerStaminaBar.value = +playerStaminaBar.value + staminaValue;
}

function resetGame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

function removeBonusLife() {
  bonusLifeEl.parentNode.removeChild(bonusLifeEl);
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}
