class Entity {
    constructor(data) {
        this.name = data.name;
        this.level = data.level;
        this.hp = data.hp;
        this.hpMax = data.hpMax;
        this.mana = data.mana;
        this.manaMax = data.manaMax;
        this.damage = data.damage;
        this.x = data.x;
        this.y = FLOOR;
        this.size = data.size;
        this.speed = data.speed;
        this.element = document.querySelector(data.element)
        this.delayAttack = data.delayAttack;
        this.attackCountMax = data.attackCountMax;
        this.dyingTime = data.dyingTime;
        this.spriteManager = new SpriteManager(this.element, data.spriteConfig)
        this.attackCount = 1;
        this.isAttacking = false;
        this.isDying = false;
        this.isDead = false;
        this.dieTimeout = null;
        this.attackTimeout = null;
    }

    attack(entity_target) {
        if (this.isAttacking || this.isDying || this.isDead) return;
        this.isAttacking = true;
        this.spriteManager.setState(`attack${this.attackCount}`)

        if (entity_target) {
            if (calculateDistance(this.x, this.y, entity_target.x, entity_target.y) <=  entity_target.size) {
                entity_target.hp -= this.damage;
            }
        }

        // delay attack
        clearTimeout(this.attackTimeout);
        this.attackTimeout = setTimeout(() => {
            if (this.isDying || this.isDead) return;
            this.spriteManager.setState('idle')
            this.isAttacking = false;
            if (this.attackCount >= this.attackCountMax) {
                this.attackCount = 1;
            } else {
                this.attackCount++;
            }
        }, this.delayAttack * 1000);
    }

    die(callback = false) {
        if (this.isDying) return;
        this.isDying = true;
        this.spriteManager.setState('die')
        clearTimeout(this.dieTimeout);
        this.dieTimeout = setTimeout(() => {
            this.isDying = false;
            this.isDead = true;
            this.spriteManager.stopped = true;
            if (callback) callback();
        }, this.dyingTime);
    }
}