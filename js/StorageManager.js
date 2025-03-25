class StorageManager {
    constructor() {
        this.STORAGE_KEY = 'characterCustomization';
    }

    saveCharacterState(characterData) {
        try {
            const data = {
                ...characterData,
                shirtStyle: document.getElementById('shirtStyle').value,
                pantsStyle: document.getElementById('pantsStyle').value,
                shirtColor: document.getElementById('shirtColor').value,
                pantsColor: document.getElementById('pantsColor').value
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving character state:', error);
            return false;
        }
    }

    loadCharacterState() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading character state:', error);
            return null;
        }
    }

    clearCharacterState() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}