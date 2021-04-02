const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const ATTACK_STAMINA_VALUE = 10;
const STRONG_ATTACK_STAMINA_VALUE = 20;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const STAMINA_REFILL = 20;
const HEALTH_COST = 25;
const STAMINA_COST = 15;

//const herosName = prompt('Hvað heitir hetjan þín?')
const enteredHealth = prompt("Hámarks líf fyrir þig og skrimslið.", "100");
const enteredStamina = prompt("Hámarks þol fyrir þig og skrimslið.", "100");
const enteredMoney = prompt("Hámarks peningur sem hetjuna þína", "100");

let chosenMaxLife = parseInt(enteredHealth);
let chosenMaxStamina = parseInt(enteredStamina);
let chosenMaxMoney = parseInt(enteredMoney);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let currentPlayerStamina = chosenMaxStamina;
let currentPlayersMoney = chosenMaxMoney;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);
adjustStaminaBars(chosenMaxStamina);

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  currentPlayerStamina = chosenMaxStamina;
  currentPlayersMoney = chosenMaxStamina;
  resetGame(chosenMaxLife, chosenMaxStamina, chosenMaxMoney);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("Þú ert heppin að þú átt auka líf, annars hefðiru tapað!");
  }

  if (currentPlayerStamina <= 0) {
    alert("Þú hefur ekki meira þol");
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("Þú sigraðir skrímslið!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("Þú tapaðir fyrir skrímslinu!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("Þú gerðir jafntefli við skrímslið");
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
    staminaLost = ATTACK_STAMINA_VALUE;
  } else if (mode === "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
    staminaLost = STRONG_ATTACK_STAMINA_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  const lost_stamina = staminaCost(staminaLost);
  currentMonsterHealth -= damage;
  currentPlayerStamina -= lost_stamina;
  endRound();
}

function attackHandler() {
  attackMonster("ATTACK");
}

function strongAttackHandler() {
  attackMonster("STRONG_ATTACK");
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("Þú getur ekki læknað þig meira en hámarks lífið þitt");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else if (currentPlayersMoney <= 0) {
    alert("Þú átt ekki meiri pening");
  } else {
    healValue = HEAL_VALUE;
    cost = HEALTH_COST;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  const health_cost = spendMoney(cost);
  currentPlayersMoney -= cost;
  endRound();
}

function refillStaminaHandler() {
  let staminaValue;
  let moneySpent;
  if (currentPlayerStamina >= chosenMaxStamina - STAMINA_REFILL) {
    alert("Þú getur ekki fyllt á þolið þitt meira en hámarks þolið þitt er");
    staminaValue = chosenMaxStamina - currentPlayerStamina;
  } else if (currentPlayersMoney < 0) {
    alert("Þú átt ekki nógu mikinn pening");
  } else {
    moneySpent = STAMINA_COST;
    staminaValue = STAMINA_REFILL;
  }
  increasePlayerStamina(STAMINA_REFILL);
  currentPlayerStamina += STAMINA_REFILL;
  currentPlayersMoney -= moneySpent;
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
staminaBTN.addEventListener("click", refillStaminaHandler);
