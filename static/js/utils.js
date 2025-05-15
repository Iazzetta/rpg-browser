
const FLOOR = 210;
const ENTITY_SCALE = 2;
const GRAVITY_FORCE = 15;
const HITBOX_DEBUG = true;

let currentMonster = 0;

const getCurrentMonster = () => {
    const monster = superCopy(MONSTERS[currentMonster]);
    return new Enemy(monster);
}

const getCurrentMonsterById = (id) => {
  for (const monster of MONSTERS) {
    if (monster.id === id) {
      return superCopy(monster);
    }
  }
}

function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}


function superCopy(source, deep) {
    var o, prop, type;
 
   if (typeof source != 'object' || source === null) {
     // What do to with functions, throw an error?
     o = source;
     return o;
   }
 
   o = new source.constructor();
 
   for (prop in source) {
 
     if (source.hasOwnProperty(prop)) {
       type = typeof source[prop];
 
       if (deep && type == 'object' && source[prop] !== null) {
         o[prop] = copy(source[prop]);
 
       } else {
         o[prop] = source[prop];
       }
     }
   }
   return o;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}