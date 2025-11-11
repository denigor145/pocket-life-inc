// Инициализация Telegram WebApp
let tg = window.Telegram.WebApp;

class TelegramApp {
    constructor() {
        this.tg = tg;
        this.init();
    }

    init() {
        // Расширяем на весь экран
        this.tg.expand();
        
        // Инициализируем основные параметры
        this.user = this.tg.initDataUnsafe?.user;
        
        console.log('Telegram WebApp инициализирован');
        console.log('User:', this.user);
    }

    // Метод для показа хaptic уведомлений
    showHaptic(type) {
        if (this.tg?.HapticFeedback) {
            this.tg.HapticFeedback.impactOccurred(type);
        }
    }

    // Закрыть приложение
    closeApp() {
        this.tg.close();
    }
}

// Создаем глобальный экземпляр
const telegramApp = new TelegramApp();
