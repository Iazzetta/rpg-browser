const MONSTERS = [
    {
        id: 1,
        name: 'Verme de Fogo',
        level: 1,
        hp: 45,
        hpMax: 45,
        mana: 100,
        manaMax: 100,
        damage: 2,
        x: window.innerWidth - 150,
        size: 90,
        speed: 3,
        element: 'enemy',
        delayAttack: 2,
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
            },
            takehit: {
                src: '/static/img/sprites/fire_worm/takehit.png',
                frame: 1,
                frames: 3,
                width: 90,
                height: 90
            }
        }
    },
]