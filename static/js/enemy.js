class Enemy {
    constructor(name, level, icon, hp, hpMax, damage, delayAttack) {
        this.name = name;
        this.level = level;
        this.icon = icon;
        this.hp = hp;
        this.hpMax = hpMax;
        this.damage = damage;
        this.delayAttack = delayAttack;
        this.attackInterval = null;
        this.initEnemy();
    }

    initEnemy() {
        this.autoAttack();
    }

    autoAttack() {
        this.attackInterval = setInterval(() => {
            window.player.hp -= this.damage;
        }, this.delayAttack * 1000);
    }

    stopEvents() {
        clearInterval(this.attackInterval);
    }

    draw() {
        // name
        document.querySelector('#enemy-name').innerText = this.name;
        // level
        document.querySelector('#enemy-level').innerText = `Lv. ${this.level}`;
        // hp
        document.querySelector('.enemy-panel .stats-bar-fill.hp').style.width = `${this.hp / this.hpMax * 100}%`;
        document.querySelector('.enemy-panel .stats-bar-fill.hp').innerText = `${this.hp}/${this.hpMax}`;

        // icon
        document.querySelector('.entity.enemy').innerText = this.icon;
    }
}
