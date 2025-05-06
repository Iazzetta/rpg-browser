let currentMonster = 0;
const getCurrentMonster = () => {
    const monster = MONSTERS[currentMonster];
    return new Enemy(
        monster.name,
        monster.level,
        monster.icon,
        monster.hp,
        monster.hpMax,
        monster.damage,
        monster.delayAttack,
        monster.speed
    );
}

function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }