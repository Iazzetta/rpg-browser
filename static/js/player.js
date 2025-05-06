class Player {
    constructor(name, level, hp, hpMax, mana, manaMax, exp, expMax, damage, delayAttack) {
        this.name = name;
        this.level = level;
        this.hp = hp;
        this.hpMax = hpMax;
        this.mana = mana;
        this.manaMax = manaMax;
        this.exp = exp;
        this.expMax = expMax;
        this.damage = damage;
        this.delayAttack = delayAttack;
        this.isAttacking = false;
    }

    attack(entity) {
        if (this.isAttacking) return;
        this.isAttacking = true;
        entity.hp -= this.damage;
        setTimeout(() => {
            this.isAttacking = false;
        }, this.delayAttack * 1000);
    }

    draw() {
        // name
        document.querySelector('#user-name').innerText = this.name;
        // level
        document.querySelector('#user-level').innerText = `Lv. ${this.level}`;
        // hp
        document.querySelector('.user-panel .stats-bar-fill.hp').style.width = `${this.hp / this.hpMax * 100}%`;
        document.querySelector('.user-panel .stats-bar-fill.hp').innerText = `${this.hp}/${this.hpMax}`;
        // mana
        document.querySelector('.user-panel .stats-bar.mana').innerText = `${this.mana}/${this.manaMax}`;
        // exp
        document.querySelector('.user-panel .stats-bar.exp').innerText = `${this.exp}/${this.expMax}`;
    }

    checkLevelUp() {
        if (this.exp >= this.expMax) {
            this.level++;
            this.exp = 0;
            this.expMax = this.expMax * 2;
            // todo - give 2 skill points
        }
    }
}
