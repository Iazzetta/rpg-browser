window.player = new Player({
    name: 'Guilherme', 
    level: 1, 
    hp: 100, 
    hpMax: 100, 
    mana: 100, 
    manaMax: 100, 
    damage: 10, 
    x: 35,
    size: 162,
    speed: 6,
    element: 'player',
    delayAttack: .5, 
    cooldownAttack: .5, 
    attackCountMax: 3,
    dyingTime: 400,
    exp: 0, 
    expMax: 100,
    stats_points: 2,
    stats: {
        strength: 1,
        constitution: 1,
        dexterity: 1
    },
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

// presentear um item
const potionItemGift = new Potion({
    name: 'Poção HP Simples',
    description: 'Aumenta seu HP em 30',
    icon: '🧪',
    increaseHp: 30,
    cooldownTime: 5
})
const expChestItemGift = new ExpChest({
    name: 'Cofre de Exp',
    description: 'Aumenta seu EXP em 100',
    icon: '🎁',
    increaseExp: 100,
    cooldownTime: 1
})
window.player.inventory.addItem(potionItemGift)
window.player.inventory.addItem(expChestItemGift)

window.player.inventory.setQuickItem(potionItemGift, 4);
window.player.inventory.setQuickItem(expChestItemGift, 5);

// init world
window.world = new World();

// init enemies
window.enemies = []

const gameLoop = () => {

    window.player.update();
    window.world.update();
    
    for (const enemy of window.enemies) {
        if (enemy) {
            enemy.update();
    
            if (enemy.hp <= 0 && (!enemy.isDying && !enemy.isDead)) {
                window.player.exp += enemy.expReward
                enemy.die()
            }
        }
    }
    
    if (window.player.hp <= 0) {
        window.player.die(() => {
            // nada
        })
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);