class Enemy extends Entity{
    constructor(data) {
       super(data);
        this.speed = data.speed;
        this.isAttacking = false;
        this.botInterval = null;

        // todo - entender o porque disso
        this.y = FLOOR + 22
        
    }

    update() {
        super.update(10)
        this.spriteManager.update();
        if (this.isDying || this.isDead) return;
        this.movement();
        this.draw();
    }

    movement() {
        if (this.hitboxX > (window.player.hitboxX + window.player.hitboxWidth)) {
            this.x -= this.speed;
            this.element.style.transform = `scale(-${ENTITY_SCALE}, ${ENTITY_SCALE})`;
        }
        else if ((this.hitboxX + this.hitboxWidth) < window.player.hitboxX) {
            this.x += this.speed;
            this.element.style.transform = `scale(${ENTITY_SCALE}, ${ENTITY_SCALE})`;
        }
        else {
            if (window.player.hp > 0) {
                this.attack(window.player)
            }
        }
    }

    draw() {
        // name
        document.querySelector('#enemy-name').innerText = this.name;
        // level
        document.querySelector('#enemy-level').innerText = `Lv. ${this.level}`;
        // hp
        document.querySelector('.enemy-panel .stats-bar-fill.hp').style.width = `${this.hp / this.hpMax * 100}%`;
        document.querySelector('.enemy-panel .stats-bar-fill.hp').innerText = `${this.hp}/${this.hpMax}`;

        // enemy position
        this.element.style.left = `${this.x}px`;
        this.element.style.bottom = `${this.y}px`;
    }
}
