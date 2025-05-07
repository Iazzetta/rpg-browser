class Enemy {
    constructor(name, level, icon, hp, hpMax, damage, delayAttack, speed, floor) {
        this.name = name;
        this.level = level;
        this.icon = icon;
        this.hp = hp;
        this.hpMax = hpMax;
        this.damage = damage;
        this.delayAttack = delayAttack;
        this.botInterval = null;
        this.width = 200;
        this.height = 200;
        this.x = window.innerWidth - 100 - this.width;
        this.y = floor;
        this.speed = speed;
        this.isAttacking = false;
        this.element = document.querySelector('.enemy')

        this.spriteManager = new SpriteManager(this.element, {
            idle: {
                src: '/static/img/sprites/fire_worm/idle.png',
                frame: 1,
                frames: 9,
                width: 90,
                height: 90
            },
            attack: {
                src: '/static/img/sprites/fire_worm/attack.png',
                frame: 1,
                frames: 16,
                width: 90,
                height: 90
            },
        })
    }

    update() {
        this.movement();
        this.draw();
        this.spriteManager.update()
    }

    movement() {
        if (this.x > (window.player.x + window.player.width)) {
            this.x -= this.speed;
            this.element.style.transform = `scale(-${ENTITY_SCALE}, ${ENTITY_SCALE})`;
        }
        else if (this.x + this.width < window.player.x) {
            this.x += this.speed;
            this.element.style.transform = `scale(-${ENTITY_SCALE}, ${ENTITY_SCALE})`;
        }
        else {
            if ((this.y + this.height) >= (window.player.y + window.player.height)) {
                this.attack()
            }
        }
    }

    attack() {
        if (this.isAttacking) return;
        this.isAttacking = true;
        window.player.hp -= this.damage;
        this.spriteManager.setState('attack');

        this.botInterval = setTimeout(() => {
            this.isAttacking = false;
            this.spriteManager.setState('idle');
        }, this.delayAttack * 1000);
    }

    stopEvents() {
        clearInterval(this.botInterval);
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
        // document.querySelector('.entity.enemy').innerText = this.icon;

        // enemy position
        document.querySelector('.enemy').style.left = `${this.x}px`;
        document.querySelector('.enemy').style.bottom = `${this.y}px`;
    }
}
