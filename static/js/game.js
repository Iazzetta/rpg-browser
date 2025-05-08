window.player = new Player({
    name: 'Guilherme', 
    level: 1, 
    hp: 100, 
    hpMax: 100, 
    mana: 100, 
    manaMax: 100, 
    exp: 0, 
    expMax: 100, 
    damage: 10, 
    delayAttack: .5, 
    step: 6
});

window.enemy = getCurrentMonster();

const gameLoop = () => {
    window.player.update();
    window.enemy.update();

    if (window.player.hp <= 0 || window.enemy.hp <= 0) {
        window.enemy.stopEvents();
    }

    if (window.enemy.hp <= 0) {
        window.player.exp += 10;
        window.player.checkLevelUp();
        // currentMonster++;
        window.enemy = getCurrentMonster();
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);