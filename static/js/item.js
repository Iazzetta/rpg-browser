class Item {
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
        this.icon = data.icon;
        this.cooldownTime = data.cooldownTime;
        this.quickItemPosition = null;
        this.usingItem = false;
    }

    coolDownCheck(callback) {
        if (this.usingItem) return;
        this.usingItem = true;
        
        callback();

        setTimeout(() => {
            this.usingItem = false;
        }, this.cooldownTime * 1000);
    }
}
