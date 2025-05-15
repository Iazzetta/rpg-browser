class Inventory {
    constructor(entity_owner) {
        this.showInventory = false;
        this.items = [];
        this.maxItems = 10;
        this.entity_owner = entity_owner;
    }

    update() {
        this.drawIventory();
        this.drawQuickItem();
    }

    drawIventory() {
        if (!this.showInventory) return;
        // draw
    }

    drawQuickItem() {
        // draw items in quick menu order by quickItemPosition
        const $panel = document.querySelector('.itens-shortcut-panel .items');
        // CLEAN FIRST ALL SLOTS
        document.querySelectorAll(`.itens-shortcut-panel .slot`).forEach(slot => {
            slot.innerHTML = '';
        });

        for (const item of this.items) {
            if (item.quickItemPosition) {
                const $slot = document.querySelector(`.itens-shortcut-panel .slot[data-id="${item.quickItemPosition}"]`);
                $slot.innerHTML = `${item.icon}`;
                $slot.addEventListener('click', () => {
                    item.useItem(this.entity_owner);
                });
            }
        }
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
    }

    setQuickItem(item, position) {
        item.quickItemPosition = position;
    }

    getItemByPosition(position) {
        return this.items.find(item => item.quickItemPosition === position);
    }
}