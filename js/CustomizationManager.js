class CustomizationManager {
  constructor(characterModel) {
    this.character = characterModel;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.getElementById("skinColor").addEventListener("input", (e) => {
      this.updateSkinColor(e.target.value);
    });

    document.getElementById("hairStyle").addEventListener("change", (e) => {
      this.updateHairStyle(e.target.value);
    });

    document.getElementById("hairColor").addEventListener("input", (e) => {
      this.updateHairColor(e.target.value);
    });

    document.getElementById("eyeColor").addEventListener("input", (e) => {
      this.updateEyeColor(e.target.value);
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

  updateSkinColor(color) {
    this.character.body.material.color.set(color);

    this.character.head.material.color.set(color);

    this.character.leftArm.material.color.set(color);
    this.character.rightArm.material.color.set(color);
    this.character.leftLeg.material.color.set(color);
    this.character.rightLeg.material.color.set(color);

    this.character.nose.material.color.set(color);
  }

  updateHairStyle(style) {
    if (this.character.hair) {
      this.character.head.remove(this.character.hair);
    }

    let hairGeometry;
    switch (style) {
      case "long":
        hairGeometry = new THREE.CylinderGeometry(0.42, 0.35, 0.7, 32);
        break;
      case "ponytail":
        hairGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        break;
      default:
        hairGeometry = new THREE.SphereGeometry(
          0.42,
          32,
          32,
          0,
          Math.PI * 2,
          0,
          Math.PI / 2
        );
    }

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: document.getElementById("hairColor").value,
      roughness: 0.7,
      metalness: 0.1,
    });

    this.character.hair = new THREE.Mesh(hairGeometry, hairMaterial);

    if (style === "long") {
      this.character.hair.position.y = 0.2;
      this.character.hair.position.z = -0.1;
    } else if (style === "ponytail") {
      this.character.hair.position.y = 0.2;
      this.character.hair.position.z = -0.4;
    } else {
      this.character.hair.position.y = 0.2;
    }

    this.character.head.add(this.character.hair);
  }

  updateHairColor(color) {
    if (this.character.hair) {
      this.character.hair.material.color.set(color);
    }

    this.character.leftBrow.material.color.set(color);
    this.character.rightBrow.material.color.set(color);
  }

  updateEyeColor(color) {
    this.character.leftEye.material.color.set(color);
    this.character.rightEye.material.color.set(color);
  }
}

window.CustomizationManager = CustomizationManager;
