class Player extends Entity {
    constructor(data) {
        super(data);
        this.exp = data.exp;
        this.expMax = data.expMax;
        this.keyboard = {left: false, right: false, jump: false}
        this.isJumping = false;
        this.jumpMaxHeight = 500;
        this.gravityForce = GRAVITY_FORCE
        this.jumpFall = false;

        this.initEvents();
    }

    update() {
        super.update()
        this.spriteManager.update();
        if (this.isDying || this.isDead) return;
        this.movement();
        this.draw();
    }

    movement() {
        if (!this.blockMovement) {
            if (this.keyboard.left || this.keyboard.right) {
                if (!this.isAttacking) {
                    if (!this.isJumping) {
                        this.spriteManager.setState('run')
                    }
    
                    if (this.keyboard.left) {
                        this.x -= this.speed
                    }
                    if (this.keyboard.right) {
                        this.x += this.speed
                    }
                }
            }
        }

        if (this.keyboard.jump) {
            this.jump();
        }

        this.jumpGravity();

        // idle state
        if (!this.keyboard.left 
            && !this.keyboard.right 
            && !this.isAttacking 
            && !this.isJumping
            && !this.isDying) {
            this.spriteManager.setState('idle')
        }
    }

    jump() {
        if (this.isJumping || this.isDying || this.isDead) return;
        this.isJumping = true;
        this.jumpFall = false;
        this.spriteManager.setState('jump')
    }

    jumpGravity() {
        if (this.isJumping) {
            if (this.y <= this.jumpMaxHeight && !this.jumpFall) {
                this.y += this.gravityForce;
            } else {
                this.jumpFall = true;
                this.spriteManager.setState('fall')
                if (this.y > FLOOR) {
                    this.y -= this.gravityForce;
                }
                else {
                    this.isJumping = false;
                }
            }
        }
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
        document.querySelector('.user-panel .stats-bar-fill.mana').style.width = `${this.mana / this.manaMax * 100}%`;
        document.querySelector('.user-panel .stats-bar-fill.mana').innerText = `${this.mana}/${this.manaMax}`;
        // exp
        document.querySelector('.user-panel .stats-bar-fill.exp').style.width = `${this.exp / this.expMax * 100}%`;
        document.querySelector('.user-panel .stats-bar-fill.exp').innerText = `${this.exp}/${this.expMax}`;

        // player position
        this.element.style.left = `${this.x}px`;
        this.element.style.bottom = `${this.y}px`;

    }

    checkLevelUp() {
        if (this.exp >= this.expMax) {
            this.level++;
            this.exp = 0;
            this.expMax = this.expMax * 2;
            // todo - give 2 skill points
        } else {
            this.exp += 10;
        }
    }

    initEvents() {
        // attack event
        document.querySelector('.game-container').addEventListener('mousedown', (e) => {
            window.player.attack(window.enemy);
        });

        // movement event
        document.addEventListener('keypress', (e) => {
            if (this.isDying || this.isDead) return;
            const key = e.key.toLocaleLowerCase()
            if (key === 'a') {
                this.keyboard.left = true;
                this.element.style.transform = `scale(-${ENTITY_SCALE}, ${ENTITY_SCALE})`;
            }
            if (key === 'd') {
                this.keyboard.right = true;
                this.element.style.transform = `scale(${ENTITY_SCALE}, ${ENTITY_SCALE})`;
            }
            if (key === ' ') {
                this.keyboard.jump = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (this.isDying || this.isDead) return;
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
