class Game {
    constructor() {
        this.characters = [
            { name: "Воин", health: 100 },
            { name: "Маг", health: 100 },
            { name: "Лучник", health: 100 },
            { name: "Торговец", health: 100 }
        ];
        this.currentCharacter = null;
        this.gold = 0;
        this.horseshoes = 0;
        this.init();
    }

    init() {
        this.bindEvents();
        this.startGame();
    }

    bindEvents() {
        // Главное меню
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                window.location.href = 'game.html';
            });
        }

        // Игровые события
        const actionBtn = document.getElementById('actionBtn');
        if (actionBtn) {
            actionBtn.addEventListener('click', () => {
                this.performAction();
            });
        }

        // Кнопки возврата в меню
        const toMainMenuWin = document.getElementById('toMainMenuWin');
        const toMainMenuLose = document.getElementById('toMainMenuLose');
        
        if (toMainMenuWin) toMainMenuWin.addEventListener('click', () => this.goToMainMenu());
        if (toMainMenuLose) toMainMenuLose.addEventListener('click', () => this.goToMainMenu());
    }

    startGame() {
        if (window.location.pathname.includes('game.html')) {
            this.selectRandomCharacter();
            this.updateUI();
        }
    }

    selectRandomCharacter() {
        const randomIndex = Math.floor(Math.random() * this.characters.length);
        this.currentCharacter = {...this.characters[randomIndex]};
    }

    performAction() {
        if (!this.currentCharacter) return;

        const success = Math.random() <= 0.8; // 80% шанс успеха

        if (success) {
            // Успех: отнимаем здоровье
            this.currentCharacter.health -= 30;
            telegramApp.showHaptic('heavy');
        } else {
            // Неудача: восстанавливаем здоровье
            this.currentCharacter.health += 20;
            telegramApp.showHaptic('light');
        }

        // Ограничиваем максимальное здоровье
        if (this.currentCharacter.health > 150) {
            this.currentCharacter.health = 150;
        }

        this.updateUI();
        this.checkGameEnd();
    }

    checkGameEnd() {
        if (this.currentCharacter.health <= 0) {
            this.showWinModal();
        } else if (this.currentCharacter.health >= 150) {
            this.showLoseModal();
        }
    }

    showWinModal() {
        // Награда за победу
        this.gold += 10;
        
        // 20% шанс получить подкову
        const gotHorseshoe = Math.random() <= 0.2;
        if (gotHorseshoe) {
            this.horseshoes += 1;
        }

        const modal = document.getElementById('winModal');
        const itemReward = document.getElementById('itemReward');
        
        itemReward.textContent = gotHorseshoe ? '+1 Подкова' : '';
        modal.classList.remove('hidden');
    }

    showLoseModal() {
        const modal = document.getElementById('loseModal');
        modal.classList.remove('hidden');
    }

    goToMainMenu() {
        window.location.href = 'index.html';
    }

    updateUI() {
        if (!this.currentCharacter) return;

        const characterName = document.getElementById('characterName');
        const healthFill = document.getElementById('healthFill');
        const healthText = document.getElementById('healthText');
        const goldCount = document.getElementById('goldCount');
        const horseshoeCount = document.getElementById('horseshoeCount');

        if (characterName) characterName.textContent = this.currentCharacter.name;
        if (healthFill) healthFill.style.width = `${(this.currentCharacter.health / 150) * 100}%`;
        if (healthText) healthText.textContent = `${this.currentCharacter.health}/150`;
        if (goldCount) goldCount.textContent = this.gold;
        if (horseshoeCount) horseshoeCount.textContent = this.horseshoes;
    }
}

// Инициализация игры когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});
