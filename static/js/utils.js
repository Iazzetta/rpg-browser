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
        monster.delayAttack
    );
}