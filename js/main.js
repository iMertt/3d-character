import * as THREE from "three";

class CustomizationManager {
  constructor(characterModel) {
    this.character = characterModel;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.getElementById("skinColor").addEventListener("input", (e) => {
      this.character.updateSkinColor(e.target.value);
    });

    document.getElementById("hairStyle").addEventListener("change", (e) => {
      this.character.updateHairStyle(e.target.value);
    });

    document.getElementById("hairColor").addEventListener("input", (e) => {
      this.character.updateHairColor(e.target.value);
    });

    document.getElementById("eyeColor").addEventListener("input", (e) => {
      this.character.updateEyeColor(e.target.value);
    });

    document.getElementById("shirtStyle").addEventListener("change", (e) => {
      this.character.updateShirtStyle(e.target.value);
    });

    document.getElementById("pantsStyle").addEventListener("change", (e) => {
      this.character.updatePantsStyle(e.target.value);
    });

    document.getElementById("shirtColor").addEventListener("input", (e) => {
      this.character.updateShirtColor(e.target.value);
    });

    document.getElementById("pantsColor").addEventListener("input", (e) => {
      this.character.updatePantsColor(e.target.value);
    });

    document.getElementById("expression").addEventListener("change", (e) => {
      this.character.setExpression(e.target.value);
    });
  }
}

window.addEventListener("load", () => {
  if (window.characterModel) {
    new CustomizationManager(window.characterModel);
  }
});

export { CustomizationManager };
