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
        this.y = 225;
        this.width = 200;
        this.height = 200;
        this.step = speed;
        
        this.keyboard = {left: false, right: false, jump: false}

        this.isJumping = false;
        this.jumpMaxHeight = 500;
        this.gravityForce = 15
        this.jumpFall = false;

        this.element = document.querySelector('.player')

        this.initEvents();
    }

    update() {
        this.movement();
        this.draw();
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

        this.checkRotation();
    }

    checkRotation() {
        if (this.x > (window.enemy.x + window.enemy.width)) {
            this.element.style.transform = 'scaleX(1)';
        }
        else if (this.x + this.width < window.enemy.x) {
            this.element.style.transform = 'scaleX(-1)';
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
                if (this.y > 225) {
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
        document.querySelector('.entity.enemy').addEventListener('mousedown', (e) => {
            console.log(calculateDistance(this.x, this.y, window.enemy.x, window.enemy.y))
            if (calculateDistance(this.x, this.y, window.enemy.x, window.enemy.y) <= 200) {
                window.player.attack(window.enemy);
            }
        });

        // movement event
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLocaleLowerCase()
            if (key === 'a') {
                this.keyboard.left = true;
            }
            if (key === 'd') {
                this.keyboard.right = true;
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
