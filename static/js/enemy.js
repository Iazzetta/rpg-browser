class Enemy extends Entity{
    constructor(data) {
       super(data);
        this.speed = data.speed;
        this.hitboxCustomOffsetY = data.hitboxCustomOffsetY;
        this.expReward = data.expReward;
        this.isAttacking = false;
        this.botInterval = null;
        this.takingHit = false;
        this.directionEnemy = 'right';
        this.createBars();
        
    }

    update() {
        super.update(this.hitboxCustomOffsetY)
        this.spriteManager.update();
        this.y = FLOOR - (this.yCustomOffset || 0);
        if (this.isDying || this.isDead) return;
        this.movement();
        this.draw();
    }

    movement() {
        if (this.takingHit) return;

        if (window.player.isDead) {
            this.spriteManager.setState('idle');
            return;
        }

        if (this.hitboxX >= (window.player.hitboxX + window.player.hitboxWidth)) {
            this.x -= this.speed;
            this.$element.style.transform = `scale(-${ENTITY_SCALE}, ${ENTITY_SCALE})`;
            document.querySelector('.enemy-panel').style.transform = `scale(-1, 1)`;
            this.directionEnemy = 'left';
            this.spriteManager.setState('run');
        }
        else if ((this.hitboxX + this.hitboxWidth) <= window.player.hitboxX) {
            this.x += this.speed;
            this.$element.style.transform = `scale(${ENTITY_SCALE}, ${ENTITY_SCALE})`;
            document.querySelector('.enemy-panel').style.transform = `scale(1, 1)`;
            this.directionEnemy = 'right';
            this.spriteManager.setState('run');
        }

        if (!this.isAttacking && calculateDistance(this.hitboxX, this.hitboxY, window.player.hitboxX, window.player.hitboxY) <=  window.player.hitboxWidth) {
            if (window.player.hp > 0) {
                this.attack(() => {
                    if (window.player) {
                        if (calculateDistance(this.hitboxX, this.hitboxY, window.player.hitboxX, window.player.hitboxY) <=  window.player.hitboxWidth) {
                            window.player.hp -= this.damage;
                        }
                    }
                })
            }
        }
    }

    draw() {

        // draw bars
        this.drawBars();

        // enemy position
        this.$element.style.left = `${this.x}px`;
        this.$element.style.bottom = `${this.y}px`;
    }

    createBars() {
        const hpbar = document.createElement('div');
        hpbar.classList.add('enemy-panel', 'stats-bar');
        const hpbarFill = document.createElement('div');
        hpbarFill.classList.add('stats-bar-fill');
        hpbarFill.classList.add('hp');
        hpbar.appendChild(hpbarFill);
        hpbar.style.top = `${this.hitboxXOffset - 15}px`;
        hpbar.style.left = `${this.hitboxYOffset }px`;
        this.$element.appendChild(hpbar);

    }

    drawBars() {
        this.$element.querySelector('.enemy-panel .stats-bar-fill.hp').style.width = `${this.hp / this.hpMax * 100}%`;
        this.$element.querySelector('.enemy-panel .stats-bar-fill.hp').innerText = `${this.hp}/${this.hpMax}`;
    }

    takeHit(damage) {
        this.takingHit = true;
        this.hp -= damage;
        if (this.directionEnemy === 'left') {
            this.x += this.speed * 10;
        } else {
            this.x -= this.speed * 10;
        }
        this.spriteManager.setState('takehit');
        setTimeout(() => {
            this.takingHit = false;
            this.spriteManager.setState('idle');
        }, this.delayTakeHit * 1000);
    }
}
