class Potion extends Item {
    constructor(data) {
        super(data);
        this.increaseHp = data.increaseHp;
    }

    useItem(entity = false) {
        super.coolDownCheck(() => {
            if (entity.hp + this.increaseHp > entity.hpMax) {
                entity.hp = entity.hpMax
            } else {
                entity.hp += this.increaseHp;
            }
        })
    }
    
    
}