
const FLOOR = 210;
const ENTITY_SCALE = 2;
const GRAVITY_FORCE = 15;

let currentMonster = 0;

const getCurrentMonster = () => {
    const monster = MONSTERS[currentMonster];
    return new Enemy(monster);
}

function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }