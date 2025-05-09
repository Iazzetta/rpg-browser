const MONSTERS = [
    {
        name: 'Verme de Fogo',
        level: 1,
        hp: 30,
        hpMax: 30,
        mana: 100,
        manaMax: 100,
        damage: 5,
        x: window.innerWidth - 300,
        size: 200,
        speed: 3,
        element: '.enemy',
        delayAttack: 1,
        attackCountMax: 1,
        dyingTime: 500,
        spriteConfig: {
            idle: {
                src: '/static/img/sprites/fire_worm/idle.png',
                frame: 1,
                frames: 9,
                width: 90,
                height: 90
            },
            attack1: {
                src: '/static/img/sprites/fire_worm/attack1.png',
                frame: 1,
                frames: 16,
                width: 90,
                height: 90
            },
            die: {
                src: '/static/img/sprites/fire_worm/death.png',
                frame: 1,
                frames: 8,
                width: 90,
                height: 90
            }
        }
    },
]