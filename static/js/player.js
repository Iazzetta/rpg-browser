class Player {
    constructor(name, level, hp, hpMax, mana, manaMax, exp, expMax, damage, delayAttack, speed) {
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
        this.x = 300;
        this.y = FLOOR;
        this.width = 162;
        this.height = 162;
        this.step = speed;
        
        this.keyboard = {left: false, right: false, jump: false}
        
        this.isJumping = false;
        this.jumpMaxHeight = 500;
        this.gravityForce = 15
        this.jumpFall = false;
        this.element = document.querySelector('.player')

        // load sprites
        this.spriteManager = new SpriteManager(this.element, {
            idle: {
                src: '/static/img/sprites/warrior/idle.png',
                frame: 1,
                frames: 10,
                width: 162,
                height: 162
            },
            run: {
                src: '/static/img/sprites/warrior/run.png',
                frame: 1,
                frames: 8,
                width: 162,
                height: 162
            },
            attack1: {
                src: '/static/img/sprites/warrior/attack2.png',
                frame: 1,
                frames: 7,
                width: 162,
                height: 162
            },
        })


        this.initEvents();
    }

    update() {
        this.movement();
        this.draw();
        this.spriteManager.update();
    }

    movement() {

        if (this.keyboard.left) {
            this.x -= this.step
        }
        if (this.keyboard.right) {
            this.x += this.step
        }

        if (this.keyboard.jump) {
            this.jump();
        }

        this.jumpGravity();

        // idle state
        if (!this.keyboard.left && !this.keyboard.right && !this.isAttacking && !this.isJumping) {
            this.spriteManager.setState('idle')
        }
    }

    jump() {
        if (this.isJumping) return;
        this.isJumping = true;
        this.jumpFall = false;
    }

    jumpGravity() {
        if (this.isJumping) {
            if (this.y <= this.jumpMaxHeight && !this.jumpFall) {
                this.y += this.gravityForce;
            } else {
                this.jumpFall = true;
                if (this.y > FLOOR) {
                    this.y -= this.gravityForce;
                }
                else {
                    this.isJumping = false;
                }
            }
        }
    }

    attack(entity) {
        if (this.isAttacking) return;
        this.isAttacking = true;
        this.spriteManager.setState('attack1')
        if (calculateDistance(this.x, this.y, entity.x, entity.y) <=  entity.width) {
            entity.hp -= this.damage;
        }

        // delay attack
        setTimeout(() => {
            this.isAttacking = false;
            this.spriteManager.setState('idle')
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

        // player position
        document.querySelector('.player').style.left = `${this.x}px`;
        document.querySelector('.player').style.bottom = `${this.y}px`;

    }

    checkLevelUp() {
        if (this.exp >= this.expMax) {
            this.level++;
            this.exp = 0;
            this.expMax = this.expMax * 2;
            // todo - give 2 skill points
        }
    }

    initEvents() {
        // attack event
        document.querySelector('.game-container').addEventListener('mousedown', (e) => {
            window.player.attack(window.enemy);
        });

        // movement event
        document.addEventListener('keypress', (e) => {
            const key = e.key.toLocaleLowerCase()
            if (key === 'a') {
                this.keyboard.left = true;
                this.element.style.transform = `scale(-${ENTITY_SCALE}, ${ENTITY_SCALE})`;
                this.spriteManager.setState('run')
            }
            if (key === 'd') {
                this.keyboard.right = true;
                this.element.style.transform = `scale(${ENTITY_SCALE}, ${ENTITY_SCALE})`;
                this.spriteManager.setState('run')
            }
            if (key === ' ') {
                this.keyboard.jump = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            const key = e.key.toLocaleLowerCase()
            if (key === 'a') {
                this.keyboard.left = false;
            }
            if (key === 'd') {
                this.keyboard.right = false;
            }
            if (key === ' ') {
                this.keyboard.jump = false;
            }
        });
    }
}
