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

    // Списание денег
    spendMoney(amount) {
        if (this.money >= amount) {
            this.money -= amount;
            this.save();
            this.updateUI();
            return true;
        }
        return false;
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

    // Проверка наличия предмета
    hasItem(itemName) {
        return this.items[itemName] > 0;
    }

    // Получение всех предметов
    getAllItems() {
        return this.items;
    }

    // Получение текущего баланса
    getMoney() {
        return this.money;
    }

    // Обновление интерфейса
    updateUI() {
        const moneyElement = document.getElementById('moneyCount');
        const itemsContainer = document.getElementById('itemsContainer');
        const moneyDisplay = document.getElementById('moneyDisplay');
        const currentMoney = document.getElementById('currentMoney');
        const moneyInfo = document.getElementById('moneyInfo');
        
        if (moneyElement) {
            moneyElement.textContent = this.money + ' ₽';
        }
        
        if (moneyDisplay) {
            moneyDisplay.textContent = this.money + ' ₽';
        }
        
        if (currentMoney) {
            currentMoney.textContent = this.money;
        }
        
        if (moneyInfo) {
            moneyInfo.textContent = 'Баланс: ' + this.money + ' ₽';
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
                    <div style="font-size: 12px; margin-top: 5px;">Побеждайте соперников или покупайте товары в магазине!</div>
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
                        <div class="item-sell-price">${this.getSellPrice(itemName)} ₽</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Получение иконки для предмета
    getItemIcon(itemName) {
        const icons = {
            // Предметы из победы над соперниками
            'трава': '🌿',
            'веревка': '🪢',
            'вода': '💧',
            'бумага': '📄',
            'подкова': '🧲',
            'золото': '🥇',
            
            // Мебель
            'bed': '🛏️',
            'sofa': '🛋️',
            'table': '💻',
            'bookshelf': '📚',
            'cabinet': '🚪',
            'dresser': '🗄️',
            
            // Бытовая техника
            'fridge': '❄️',
            'tv': '📺',
            'computer': '💻',
            'microwave': '📡',
            'kettle': '♨️',
            
            // Кухня
            'stove': '🔥',
            'dining_table': '🍽️',
            'sink': '🚰',
            
            // Ванная комната
            'bathtub': '🛁',
            'toilet': '🚽',
            'bathroom_sink': '🚰',
            
            // Декор
            'mirror': '🪞',
            'shoe_rack': '👟',
            'carpet': '🧶',
            'lamp': '💡'
        };
        return icons[itemName] || '📦';
    }

    // Получение отображаемого имени предмета
    getItemDisplayName(itemName) {
        const names = {
            // Предметы из победы над соперниками
            'трава': 'Трава',
            'веревка': 'Веревка',
            'вода': 'Вода',
            'бумага': 'Бумага',
            'подкова': 'Подкова',
            'золото': 'Золото',
            
            // Мебель
            'bed': 'Кровать',
            'sofa': 'Диван',
            'table': 'Рабочий стол',
            'bookshelf': 'Книжный шкаф',
            'cabinet': 'Шкаф',
            'dresser': 'Комод',
            
            // Бытовая техника
            'fridge': 'Холодильник',
            'tv': 'Телевизор',
            'computer': 'Компьютер',
            'microwave': 'Микроволновка',
            'kettle': 'Чайник',
            
            // Кухня
            'stove': 'Плита',
            'dining_table': 'Обеденный стол',
            'sink': 'Раковина',
            
            // Ванная комната
            'bathtub': 'Ванна',
            'toilet': 'Унитаз',
            'bathroom_sink': 'Раковина',
            
            // Декор
            'mirror': 'Зеркало',
            'shoe_rack': 'Обувница',
            'carpet': 'Ковёр',
            'lamp': 'Торшер'
        };
        return names[itemName] || itemName;
    }

    // Получение описания предмета
    getItemDescription(itemName) {
        const descriptions = {
            'bed': 'Комфортный сон + к выносливости',
            'sofa': 'Отдых и релаксация',
            'table': 'Рабочее место + к продуктивности',
            'bookshelf': 'Хранение книг + к знаниям',
            'cabinet': 'Хранение одежды',
            'dresser': 'Хранение вещей',
            'fridge': 'Хранение продуктов',
            'tv': 'Развлечения + к настроению',
            'computer': 'Работа и игры',
            'microwave': 'Быстрый разогрев еды',
            'kettle': 'Приготовление напитков',
            'stove': 'Приготовление пищи',
            'dining_table': 'Приём пищи',
            'sink': 'Мытьё посуды',
            'bathtub': 'Расслабляющие ванны',
            'toilet': 'Гигиена',
            'bathroom_sink': 'Умывание',
            'mirror': 'Внешний вид + к уверенности',
            'shoe_rack': 'Хранение обуви',
            'carpet': 'Уют и комфорт',
            'lamp': 'Освещение + к настроению',
            'трава': 'Полезное растение',
            'веревка': 'Прочная веревка',
            'вода': 'Чистая вода',
            'бумага': 'Бумага для записей',
            'подкова': 'Приносит удачу',
            'золото': 'Ценный металл'
        };
        return descriptions[itemName] || 'Полезный предмет для вашей квартиры';
    }

    // Получение цены предмета (для магазина)
    getItemPrice(itemName) {
        const prices = {
            'bed': 1500,
            'sofa': 1200,
            'table': 1000,
            'bookshelf': 1300,
            'cabinet': 1100,
            'dresser': 900,
            'fridge': 2500,
            'tv': 2000,
            'computer': 3000,
            'microwave': 1200,
            'kettle': 800,
            'stove': 1800,
            'dining_table': 1400,
            'sink': 1000,
            'bathtub': 2200,
            'toilet': 1500,
            'bathroom_sink': 900,
            'mirror': 700,
            'shoe_rack': 600,
            'carpet': 800,
            'lamp': 750
        };
        return prices[itemName] || 1000;
    }

    // Получение цены продажи предмета
    getSellPrice(itemName) {
        // Для предметов из магазина - 50% от цены покупки
        const buyPrice = this.getItemPrice(itemName);
        if (buyPrice > 0) {
            return Math.floor(buyPrice * 0.5);
        }
        
        // Для дропа с соперников - фиксированная цена 50 денег
        return 50;
    }

    // Проверка возможности покупки
    canAfford(itemName) {
        const price = this.getItemPrice(itemName);
        return this.money >= price;
    }

    // Покупка предмета
    buyItem(itemName) {
        const price = this.getItemPrice(itemName);
        
        if (this.canAfford(itemName)) {
            this.spendMoney(price);
            this.addItem(itemName, 1);
            return true;
        }
        return false;
    }

    // Продажа предмета
    sellItem(itemName) {
        if (!this.hasItem(itemName)) {
            return false;
        }
        
        const sellPrice = this.getSellPrice(itemName);
        this.removeItem(itemName, 1);
        this.addMoney(sellPrice);
        return true;
    }

    // Получение статистики инвентаря
    getStats() {
        const totalItems = Object.values(this.items).reduce((sum, count) => sum + count, 0);
        const uniqueItems = Object.keys(this.items).length;
        
        return {
            totalItems: totalItems,
            uniqueItems: uniqueItems,
            money: this.money,
            totalValue: this.calculateTotalValue()
        };
    }

    // Расчет общей стоимости инвентаря
    calculateTotalValue() {
        let totalValue = this.money;
        
        for (const [itemName, quantity] of Object.entries(this.items)) {
            const price = this.getItemPrice(itemName);
            totalValue += price * quantity;
        }
        
        return totalValue;
    }

    // Расчет общей стоимости продажи
    calculateTotalSellValue() {
        let totalSellValue = 0;
        
        for (const [itemName, quantity] of Object.entries(this.items)) {
            const sellPrice = this.getSellPrice(itemName);
            totalSellValue += sellPrice * quantity;
        }
        
        return totalSellValue;
    }

    // Очистка инвентаря (для отладки)
    clear() {
        this.money = 0;
        this.items = {};
        this.save();
        this.updateUI();
    }

    // Добавление стартовых предметов (для нового игрока)
    addStarterItems() {
        this.addMoney(5000); // Стартовые деньги
        this.addItem('table', 1);
        this.addItem('bed', 1);
        this.addItem('kettle', 1);
    }

    // Продать все предметы
    sellAllItems() {
        let totalEarned = 0;
        const itemsToSell = { ...this.items };
        
        for (const [itemName, quantity] of Object.entries(itemsToSell)) {
            const sellPrice = this.getSellPrice(itemName);
            totalEarned += sellPrice * quantity;
            this.removeItem(itemName, quantity);
        }
        
        this.addMoney(totalEarned);
        return totalEarned;
    }
}

// Создаем глобальный экземпляр инвентаря только если он еще не существует
if (typeof window.playerInventory === 'undefined') {
    window.playerInventory = new Inventory();
}

// Функция для загрузки инвентаря (вызывается из character.html)
function loadInventory() {
    if (window.playerInventory) {
        window.playerInventory.updateUI();
    }
}

// Функция для добавления тестовых предметов (для отладки)
function addTestItems() {
    if (window.playerInventory) {
        window.playerInventory.addMoney(10000);
        window.playerInventory.addItem('bed', 1);
        window.playerInventory.addItem('tv', 1);
        window.playerInventory.addItem('computer', 1);
        window.playerInventory.addItem('трава', 3);
        window.playerInventory.addItem('золото', 2);
        window.playerInventory.addItem('веревка', 5);
        window.playerInventory.addItem('подкова', 1);
    }
}

// Функция для быстрой продажи всех предметов (для отладки)
function sellAllDebug() {
    if (window.playerInventory) {
        const earned = window.playerInventory.sellAllItems();
        alert('Продано всех предметов на сумму: ' + earned + ' ₽');
    }
}
