const minerFlex = document.getElementById('MinerFlex');
const addButton = document.getElementById('AddButton');

const startPriceAddMiner = 30;
const startPriceUpgrade = 5;

const multiUpgradePriceInput = 1.8;
const multiMPSInput = 1.8;


let balance = 0;
let MoneyPerTimeUnit = 0;
const minerList = [];


//Input Values
let upgradePriceInput = startPriceUpgrade;
let MoneyPerSecondInput = 1;

let priceForNewMiner = 0;

//AddMiner Button Setup
const newMinerButton = document.createElement("button");
newMinerButton.textContent = "Free";
newMinerButton.className = "text bold"
newMinerButton.id = "newMinerButton"
newMinerButton.onclick = function () {
    if(balance >= priceForNewMiner){

        //Update new Miner Price
        balance -= priceForNewMiner;
        if(priceForNewMiner !== 0){
            priceForNewMiner = priceForNewMiner * 3;
        }else {
            priceForNewMiner += startPriceAddMiner;
        }
        newMinerButton.textContent = "New Miner: " + priceForNewMiner + "$"

        //Add new Miner
        minerList.push(new Miner(minerList.length + 1, upgradePriceInput, MoneyPerSecondInput))
        upgradePriceInput = Math.round(upgradePriceInput * multiUpgradePriceInput);
        MoneyPerSecondInput = MoneyPerSecondInput * multiMPSInput;
    }


};

addButton.append(newMinerButton);

const moneyText = document.getElementById('Balance');
UpdateBalance();

setInterval(UpdateBalance, 100)

function UpdateBalance(){
    balance += MoneyPerTimeUnit;
    UpdateBalanceText()
}

function UpdateBalanceText(){
    let displayBalance = String(Math.floor(balance));
    if (displayBalance.length >= 5) {
        displayBalance = displayBalance.replace(/(\d)(?=(\d{3})+$)/g, '$1\'');
    }
    moneyText.textContent = "Balance: " + String(displayBalance) + "$"
}

function AddMoneyPerTimeUnit(amount){
    MoneyPerTimeUnit += (amount * 0.1);
}

function updateAllPrices(int){
    for (let i = 0; i < minerList.length; i++) {
        minerList[i].updateUpgradeCost(int)
    }
}
