
const FLOOR = 210;
const GRAVITY_FORCE = 15;
const HITBOX_DEBUG = true;
let SOUND_VOLUME = 0.5;

// document.addEventListener('contextmenu', event => event.preventDefault());

createjs.Sound.volume = SOUND_VOLUME;

let currentMonster = 0;

const getCurrentMonster = () => {
    const monster = superCopy(window.MONSTERS[currentMonster]);
    return new Enemy(monster);
}

const getCurrentMonsterById = (id) => {
  for (const monster of window.MONSTERS) {
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

const updateVolume = (slider) => {
  SOUND_VOLUME = slider.value / 100;
  console.log('eae', SOUND_VOLUME)
  createjs.Sound.volume = SOUND_VOLUME;
}


window.loadStats = () => {

  const availablePoints = document.getElementById('available-points')
  const strengthValue = document.getElementById('strength-value')
  const constitutionValue = document.getElementById('constitution-value')
  const dexterityValue = document.getElementById('dexterity-value')

  const statsDamage = document.getElementById('stats-damage')
  const statsHp = document.getElementById('stats-hp')
  const statsAttackSpeed = document.getElementById('stats-attack-speed')
  const statsCriticalChange = document.getElementById('stats-critical-change')

  availablePoints.innerText = window.player.stats_points
  strengthValue.innerText = window.player.stats.strength
  constitutionValue.innerText = window.player.stats.constitution
  dexterityValue.innerText = window.player.stats.dexterity

  statsDamage.innerText = window.player.stats.calcTotalDamage(window.player.damage)
  statsHp.innerText = window.player.hpMax
  statsAttackSpeed.innerText = window.player.stats.calcTotalAttackSpeed(window.player.delayAttack)
  statsCriticalChange.innerText = window.player.stats.calcTotalCriticalChange()

  // add update stats events
  document.querySelectorAll('.btn-update-stats-increment:not(.loaded)').forEach((btn) => {
    btn.classList.add('loaded')
    btn.addEventListener('click', () => {
      if (window.player.stats_points > 0) {
        window.player.stats_points -= 1;
        const datakey = btn.getAttribute('data-key');
        window.player.stats.incrementPoints(datakey);
        if (datakey === 'constitution') {
          window.player.hpMax = window.player.stats.calcTotalHealth(window.player.hpMax);
        }
        window.loadStats();
      }
    })
  })
  
}


// events
document.querySelectorAll('.menu-panel .slot').forEach((slot) => {
  slot.addEventListener('click', async (e) => {
    const key = slot.getAttribute('data-key');
    const callback = slot.getAttribute('data-callback');
    await Modal.open(key, () => {
      if (callback) {
        window[callback]();
      }
    });
    
  })
})