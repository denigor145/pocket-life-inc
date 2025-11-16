// js/inventory.js
class Inventory {
    constructor() {
        this.money = 0;
        this.items = {};
        this.load();
    }

    // Загрузка инвентаря из localStorage
    load() {
        const savedInventory = localStorage.getItem('playerInventory');
        if (savedInventory) {
            const inventoryData = JSON.parse(savedInventory);
            this.money = inventoryData.money || 0;
            this.items = inventoryData.items || {};
        }
    }

    // Сохранение инвентаря в localStorage
    save() {
        const inventoryData = {
            money: this.money,
            items: this.items
        };
        localStorage.setItem('playerInventory', JSON.stringify(inventoryData));
    }

    // Добавление денег
    addMoney(amount) {
        this.money += amount;
        this.save();
        this.updateUI();
    }

    // Добавление предмета
    addItem(itemName, quantity = 1) {
        if (this.items[itemName]) {
            this.items[itemName] += quantity;
        } else {
            this.items[itemName] = quantity;
        }
        this.save();
        this.updateUI();
    }

    // Удаление предмета
    removeItem(itemName, quantity = 1) {
        if (this.items[itemName]) {
            this.items[itemName] -= quantity;
            if (this.items[itemName] <= 0) {
                delete this.items[itemName];
            }
            this.save();
            this.updateUI();
            return true;
        }
        return false;
    }

    // Получение количества предмета
    getItemCount(itemName) {
        return this.items[itemName] || 0;
    }

    // Обновление интерфейса
    updateUI() {
        const moneyElement = document.getElementById('moneyCount');
        const itemsContainer = document.getElementById('itemsContainer');
        
        if (moneyElement) {
            moneyElement.textContent = this.money + ' ₽';
        }
        
        if (itemsContainer) {
            this.displayItems(itemsContainer);
        }
    }

    // Отображение предметов
    displayItems(container) {
        const itemEntries = Object.entries(this.items);
        
        if (itemEntries.length === 0) {
            container.innerHTML = `
                <div class="empty-inventory">
                    <div style="font-size: 48px; margin-bottom: 10px;">📦</div>
                    <div>Инвентарь пуст</div>
                    <div style="font-size: 12px; margin-top: 5px;">Побеждайте соперников, чтобы получить предметы!</div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="items-grid">
                ${itemEntries.map(([itemName, quantity]) => `
                    <div class="item-card">
                        <div class="item-icon">${this.getItemIcon(itemName)}</div>
                        <div class="item-name">${this.getItemDisplayName(itemName)}</div>
                        <div class="item-count">${quantity}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Получение иконки для предмета
    getItemIcon(itemName) {
        const icons = {
            'трава': '🌿',
            'веревка': '🪢',
            'вода': '💧',
            'бумага': '📄',
            'подкова': '🧲',
            'золото': '🥇'
        };
        return icons[itemName] || '📦';
    }

    // Получение отображаемого имени предмета
    getItemDisplayName(itemName) {
        const names = {
            'трава': 'Трава',
            'веревка': 'Веревка',
            'вода': 'Вода',
            'бумага': 'Бумага',
            'подкова': 'Подкова',
            'золото': 'Золото'
        };
        return names[itemName] || itemName;
    }
}

// Создаем глобальный экземпляр инвентаря
const playerInventory = new Inventory();

// Функция для загрузки инвентаря (вызывается из character.html)
function loadInventory() {
    playerInventory.updateUI();
}
