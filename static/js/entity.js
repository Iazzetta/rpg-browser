class Entity {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.level = data.level;
        this.hp = data.hp;
        this.hpMax = data.hpMax;
        this.mana = data.mana;
        this.manaMax = data.manaMax;
        this.damage = data.damage;
        this.x = data.x;
        this.yCustomOffset = data.yCustomOffset;
        this.y = FLOOR - (this.yCustomOffset || 0);
        this.size = data.size;
        this.speed = data.speed;
        this.stats_points = data.stats_points;
        if (data.stats) {
            this.stats = new Stats(data.stats);
            this.hp = this.stats.calcTotalHealth(data.hp);
            this.hpMax = this.stats.calcTotalHealth(data.hpMax);
        }
        this.$element = document.createElement('div')
        this.$element.classList.add('entity', data.element)
        document.querySelector('.game-container').appendChild(this.$element)
        this.cooldownAttack = data.cooldownAttack;
        this.attackCountMax = data.attackCountMax;
        this.delayAttack = data.delayAttack;
        this.dyingTime = data.dyingTime;
        this.delayTakeHit = data.delayTakeHit;
        this.scale = data.scale || 2;
        this.spriteManager = new SpriteManager(this.$element, data.spriteConfig)
        this.attackCount = 1;
        this.isAttacking = false;
        this.isDying = false;
        this.isDead = false;
        this.dieTimeout = null;
        this.attackTimeout = null;
        this.hitboxWidth = 60;
        this.hitboxHeight = 50;
        this.hitboxXOffset = this.size / 2 - this.hitboxWidth / 2;
        this.hitboxYOffset = this.size / 2 - this.hitboxHeight / 2;
        this.hitboxElement = document.createElement('div');
        this.hitboxElement.classList.add('hitbox');
        this.$element.appendChild(this.hitboxElement);
        var rect = this.hitboxElement.getBoundingClientRect();
        this.hitboxX = rect.left;
        this.hitboxY = rect.top;
        this.blockMovement = false;
    }

    update(offsetYFix = 0) {
        this.drawHitbox(offsetYFix);
    }

    drawHitbox(offsetYFix = 0) {
        this.hitboxElement.style.width = `${this.hitboxWidth}px`;
        this.hitboxElement.style.height = `${this.hitboxHeight}px`;
        this.hitboxXOffset = (this.size / 2 - this.hitboxWidth / 2);
        this.hitboxYOffset = (this.size / 2 - this.hitboxHeight / 2) - offsetYFix;

        this.hitboxElement.style.top = `${this.hitboxYOffset}px`;
        this.hitboxElement.style.left = `${this.hitboxXOffset}px`;

        var rect = this.hitboxElement.getBoundingClientRect();
        this.hitboxX = rect.left;
        this.hitboxY = rect.top;

        if (HITBOX_DEBUG) {
            this.hitboxElement.style.border = '1px solid red';
        }
    }

    attack(callbackDamage) {
        if (this.isAttacking || this.isDying || this.isDead) return;
        this.isAttacking = true;
        this.spriteManager.setState(`attack${this.attackCount}`)

        callbackDamage()

        setTimeout(() => {
            this.spriteManager.setState('idle')
        }, this.stats ? this.stats.calcTotalAttackSpeed(this.delayAttack) * 1000 : this.delayAttack * 1000)

        // delay attack
        clearTimeout(this.attackTimeout);
        this.attackTimeout = setTimeout(() => {
            if (this.isDying || this.isDead) return;
            // this.spriteManager.setState('idle')
            this.isAttacking = false;
            if (this.attackCount >= this.attackCountMax) {
                this.attackCount = 1;
            } else {
                this.attackCount++;
            }
        }, this.stats ? this.stats.calcTotalAttackSpeed(this.cooldownAttack) * 1000 : this.cooldownAttack * 1000);
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
            this.$element.remove();
            if (callback) callback();
        }, this.dyingTime);
    }
}