class ExpChest extends Item {
    constructor(data) {
        super(data);
        this.increaseExp = data.increaseExp;
    }

    useItem(entity = false) {
        super.coolDownCheck(() => {
           entity.exp += this.increaseExp;
        })
    }
    
    
}