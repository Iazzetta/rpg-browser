window.player = new Player('Guilherme', 1, 100, 100, 100, 100, 0, 100, 10, 1, 6);
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
        currentMonster++;
        window.enemy = getCurrentMonster();
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);