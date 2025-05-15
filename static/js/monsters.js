const MONSTERS = [
    {
      "id": 1,
      "name": "Verme de Fogo",
      "spriteFolderName": "fire_worm",
      "level": 1,
      "hp": 45,
      "hpMax": 45,
      "mana": 100,
      "manaMax": 100,
      "damage": 2,
      "size": 90,
      "speed": 3,
      "element": "enemy",
      "delayAttack": "0.5",
      "cooldownAttack": "2",
      "attackCountMax": 1,
      "dyingTime": 500,
      "yCustomOffset": -20,
      "delayTakeHit": "0.3",
      "hitboxCustomOffsetY": 10,
      "expReward": 10,
      "spriteConfig": {
        "idle": {
          "src": "/static/img/sprites/fire_worm/idle.png",
          "frame": 1,
          "frames": 9,
          "width": 90,
          "height": 90
        },
        "attack1": {
          "src": "/static/img/sprites/fire_worm/attack1.png",
          "frame": 1,
          "frames": 16,
          "width": 90,
          "height": 90
        },
        "die": {
          "src": "/static/img/sprites/fire_worm/death.png",
          "frame": 1,
          "frames": 8,
          "width": 90,
          "height": 90
        },
        "takehit": {
          "src": "/static/img/sprites/fire_worm/takehit.png",
          "frame": 1,
          "frames": 3,
          "width": 90,
          "height": 90
        },
        "run": {
          "src": "/static/img/sprites/fire_worm/run.png",
          "frame": 1,
          "frames": 9,
          "width": 90,
          "height": 90
        }
      }
    },
    {
      "id": 2,
      "name": "Guerreiro Corrupto",
      "spriteFolderName": "corrupt_warrior",
      "level": 5,
      "hp": 165,
      "hpMax": 165,
      "mana": 100,
      "manaMax": 100,
      "damage": 5,
      "size": 140,
      "speed": 3,
      "element": "enemy",
      "delayAttack": "0.5",
      "cooldownAttack": "0.5",
      "attackCountMax": 1,
      "dyingTime": 500,
      "yCustomOffset": 0,
      "delayTakeHit": "0.8",
      "hitboxCustomOffsetY": 10,
      "expReward": 20,
      "spriteConfig": {
        "idle": {
          "src": "/static/img/sprites/corrupt_warrior/idle.png",
          "frame": 1,
          "frames": 11,
          "width": 140,
          "height": 140
        },
        "attack1": {
          "src": "/static/img/sprites/corrupt_warrior/attack1.png",
          "frame": 1,
          "frames": 6,
          "width": 140,
          "height": 140
        },
        "die": {
          "src": "/static/img/sprites/corrupt_warrior/death.png",
          "frame": 1,
          "frames": 11,
          "width": 140,
          "height": 140
        },
        "takehit": {
          "src": "/static/img/sprites/corrupt_warrior/takehit.png",
          "frame": 1,
          "frames": 4,
          "width": 140,
          "height": 140
        },
        "run": {
          "src": "/static/img/sprites/corrupt_warrior/run.png",
          "frame": 1,
          "frames": 8,
          "width": 140,
          "height": 140
        }
      }
    },
    {
      "id": 3,
      "name": "Mago de Fogo",
      "spriteFolderName": "evil_wizard",
      "level": 10,
      "hp": 500,
      "hpMax": 500,
      "mana": 100,
      "manaMax": 100,
      "damage": 15,
      "size": 150,
      "speed": 3,
      "element": "enemy",
      "delayAttack": "0.5",
      "cooldownAttack": "3",
      "attackCountMax": 1,
      "dyingTime": 500,
      "yCustomOffset": 0,
      "delayTakeHit": "0.8",
      "hitboxCustomOffsetY": 7,
      "expReward": 50,
      "spriteConfig": {
        "idle": {
          "src": "/static/img/sprites/evil_wizard/idle.png",
          "frame": 1,
          "frames": 11,
          "width": 150,
          "height": 150
        },
        "attack1": {
          "src": "/static/img/sprites/evil_wizard/attack1.png",
          "frame": 1,
          "frames": 6,
          "width": 150,
          "height": 150
        },
        "die": {
          "src": "/static/img/sprites/evil_wizard/death.png",
          "frame": 1,
          "frames": 9,
          "width": 150,
          "height": 150
        },
        "takehit": {
          "src": "/static/img/sprites/evil_wizard/takehit.png",
          "frame": 1,
          "frames": 4,
          "width": 150,
          "height": 150
        },
        "run": {
          "src": "/static/img/sprites/evil_wizard/run.png",
          "frame": 1,
          "frames": 8,
          "width": 150,
          "height": 150
        }
      }
    },
    {
      "id": 4,
      "name": "Lobo Preto",
      "spriteFolderName": "black_werewolf",
      "level": 15,
      "hp": 750,
      "hpMax": 750,
      "mana": 100,
      "manaMax": 100,
      "damage": 23,
      "size": 128,
      "speed": 4,
      "element": "enemy",
      "delayAttack": "0.5",
      "cooldownAttack": "2",
      "attackCountMax": 3,
      "dyingTime": 500,
      "yCustomOffset": -100,
      "delayTakeHit": "0.8",
      "hitboxCustomOffsetY": -38,
      "expReward": 80,
      "spriteConfig": {
        "idle": {
          "src": "/static/img/sprites/black_werewolf/idle.png",
          "frame": 1,
          "frames": 8,
          "width": 128,
          "height": 128
        },
        "attack1": {
          "src": "/static/img/sprites/black_werewolf/attack1.png",
          "frame": 1,
          "frames": 6,
          "width": 128,
          "height": 128
        },
        "die": {
          "src": "/static/img/sprites/black_werewolf/death.png",
          "frame": 1,
          "frames": 2,
          "width": 128,
          "height": 128
        },
        "takehit": {
          "src": "/static/img/sprites/black_werewolf/takehit.png",
          "frame": 1,
          "frames": 2,
          "width": 128,
          "height": 128
        },
        "run": {
          "src": "/static/img/sprites/black_werewolf/run.png",
          "frame": 1,
          "frames": 9,
          "width": 128,
          "height": 128
        },
        "attack2": {
          "src": "/static/img/sprites/black_werewolf/attack2.png",
          "frame": 1,
          "frames": 4,
          "width": 128,
          "height": 128
        },
        "attack3": {
          "src": "/static/img/sprites/black_werewolf/attack3.png",
          "frame": 1,
          "frames": 5,
          "width": 128,
          "height": 128
        }
      }
    }
  ]