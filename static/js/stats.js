class Stats {
    constructor(data) {
        this.strength = data.strength; // damage
        this.constitution = data.constitution; // health
        this.dexterity = data.dexterity; // speed attack, critical change
    }

    calcTotalDamage(damage) {
        return damage + this.strength;
    }
    
    calcTotalHealth(health) {
        return health + this.constitution;
    }

    calcTotalAttackSpeed(attackSpeed) {
        console.log(attackSpeed - (this.dexterity * 0.01))
        return attackSpeed - (this.dexterity * 0.01);
    }

    calcTotalCriticalChange() {
        return this.dexterity;
    }
}