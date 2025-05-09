window.player = new Player({
    name: 'Guilherme', 
    level: 1, 
    hp: 100, 
    hpMax: 100, 
    mana: 100, 
    manaMax: 100, 
    damage: 10, 
    x: 300,
    size: 162,
    speed: 6,
    element: '.player',
    delayAttack: .5, 
    attackCountMax: 3,
    dyingTime: 400,
    exp: 0, 
    expMax: 100,
    spriteConfig: {
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
            src: '/static/img/sprites/warrior/attack1.png',
            frame: 1,
            frames: 7,
            width: 162,
            height: 162
        },
        attack2: {
            src: '/static/img/sprites/warrior/attack2.png',
            frame: 1,
            frames: 7,
            width: 162,
            height: 162
        },
        attack3: {
            src: '/static/img/sprites/warrior/attack3.png',
            frame: 1,
            frames: 7,
            width: 162,
            height: 162
        },
        jump: {
            src: '/static/img/sprites/warrior/jump.png',
            frame: 1,
            frames: 3,
            width: 162,
            height: 162
        },
        fall: {
            src: '/static/img/sprites/warrior/fall.png',
            frame: 1,
            frames: 3,
            width: 162,
            height: 162
        },
        die: {
            src: '/static/img/sprites/warrior/death.png',
            frame: 1,
            frames: 7,
            width: 162,
            height: 162
        }
    },
});

window.enemy = getCurrentMonster();

const gameLoop = () => {

    window.player.update();
    window.enemy.update();

    if (window.enemy.hp <= 0 && (!window.enemy.isDying && !window.enemy.isDead)) {
        window.player.checkLevelUp();
        window.enemy.die(() => {
            setTimeout(() => {
                window.enemy = getCurrentMonster();
            },2000)
        })
    }
    
    if (window.player.hp <= 0) {
        window.player.die(() => {
            // nada
        })
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);