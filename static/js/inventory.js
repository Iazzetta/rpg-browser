class Inventory {
    constructor(entity_owner) {
        this.showInventory = false;
        this.items = [];
        this.maxItems = 10;
        this.entity_owner = entity_owner;
    }

    update() {
        this.drawQuickItem();
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

    loadInventory() {
        const $inventory = document.querySelector('.inventory-items')
        if ($inventory) {
            let html_slots = ''
            for (let i = 0; i < this.maxItems; i++) {
                if (this.items[i]) {
                    html_slots += `
                        <div class="slot filled" data-item-id="${this.items[i].id}">
                            ${this.items[i].icon}
                        </div>
                    `
                } else {
                    html_slots += `
                        <div class="slot"></div>
                    `
                }
            }

            $inventory.innerHTML = `
                <div class="text-right text-bold mb-2">Espaço: ${this.items.length}/${this.maxItems}</div>
                <div class="grid grid-cols-4 gap-4">
                    ${html_slots}
                </div>
            `

            document.querySelectorAll('.inventory-items .slot.filled').forEach((el) => {
                el.addEventListener('click', (ev) => {
                    const item_id = el.getAttribute('data-item-id');
                    const item = this.getItemById(item_id)
                    item.useItem(this.entity_owner);
                })
            })
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

    getItemById(item_id) {
        return this.items.find(item => item.id === item_id);
    }
}