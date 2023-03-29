let upgradePriceMulti = 1.4;


class Miner {

    constructor(numberInput, priceInput, moneyPerSecond) {
        this.level = 1;
        this.upgradePrice = priceInput;
        this.number = numberInput;
        this.moneyPerSecond = moneyPerSecond;
        this.currentIconIndex = 0;
        AddMoneyPerTimeUnit(this.moneyPerSecond);

        this.createElements()

        this.importIcons()
        this.createButton()

        this.minerContainer.append(this.minerName, this.minerLevel, this.upgradeButton, this.minerMPS, this.currentIcon);

        this.updateMinerMPSDisplay()

    }

    createElements() {
        this.minerContainer = document.createElement('MinerContainer');
        this.minerContainer.className = "container"
        minerFlex.append(this.minerContainer)

        this.minerName = document.createElement("minerName");
        this.minerName.innerHTML = "Miner " + this.number;
        this.minerName.className = "name text bold"

        this.minerMPS = document.createElement("minerMPS");
        this.minerMPS.innerHTML = "0/s"
        this.minerMPS.className = "MPS text"

        this.minerLevel = document.createElement("minerLevel");
        this.minerLevel.innerHTML = String(this.level);
        this.minerLevel.className = "level text"
    }

    importIcons() {
        this.sourceList = ["Images/PC1.png", "Images/PC2.png", "Images/PC3.png", "Images/PC4.png", "Images/PC5.png", "Images/PC6.png"]
        this.currentIcon = document.createElement("img")
        this.currentIcon.src = this.sourceList[0];
        this.currentIcon.className = "icon"
    }

    createButton() {
        let isMax = false;
        this.upgradeButton = document.createElement("button");
        this.upgradeButton.innerHTML = "$" + this.upgradePrice;
        this.upgradeButton.classList.add("upgrade")
        this.upgradeButton.onclick = () => {
            let price = 0;
            for (let i = 0; i < this.multi; i++) {
                price += Math.round(this.upgradePrice * (upgradePriceMulti ** i))
            }
            if (balance >= price && !isMax && this.multi + this.level <= 100) {
                balance -= Math.round(price);

                for (let i = 0; i < this.multi; i++) {
                    this.level += 1;
                    this.upgradePrice = this.upgradePrice * upgradePriceMulti;
                    this.updateUpgradeCost();

                    switch (this.level) {
                        case 10:
                        case 25:
                        case 50:
                        case 75:
                            this.upgradeIconsAndMPS(1.5)
                            break;
                        case 100:
                            this.upgradeIconsAndMPS(2, false)
                            break;
                        default:
                            this.upgradeIconsAndMPS(1.15, false)
                    }
                }
                this.minerLevel.textContent = String(this.level);
            }
            this.updateMinerMPSDisplay()
        }
    }

    upgradeIconsAndMPS(multi, switchPicture = true) {
        if(switchPicture){
            this.currentIconIndex += 1;
            setTimeout(() => {
                this.currentIcon.src = this.sourceList[this.currentIconIndex]
            }, 200);
        }

        AddMoneyPerTimeUnit(this.moneyPerSecond * (multi-1))
        this.moneyPerSecond = this.moneyPerSecond * multi;
    }

    updateUpgradeCost(InputMulti = this.multi){
        let value = 0;
        for (let i = 0; i < InputMulti; i++) {
            value += Math.round(this.upgradePrice * (upgradePriceMulti ** i))
        }
        this.upgradeButton.textContent = "$" + value
    }

    updateMinerMPSDisplay() {
        this.minerMPS.textContent = String(Math.round(this.moneyPerSecond * 10) / 10) + "/s";
    }

    get multi() {
        let multi;
        if (document.getElementById("1x").checked) {
            multi = 1
        } else if (document.getElementById("5x").checked) {
            multi = 5
        } else if (document.getElementById("10x").checked) {
            multi = 10
        }
        return multi
    }


}