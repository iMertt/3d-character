export class CharacterModel {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("characterCanvas"),
      antialias: true,
    });

    this.setupScene();
    this.createCharacter();
    this.setupLighting();
    this.setupControls();
    this.animate();

    // Add this at the end of constructor
    // Hide loading screen when everything is ready
    document.getElementById('loadingScreen').style.display = 'none';
}

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(2, 2, 5);
    this.scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-2, 1, -3);
    this.scene.add(fillLight);
  }

  setupScene() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xf0f0f0);
    this.camera.position.set(0, 1.5, 5);
    this.camera.lookAt(0, 1, 0);

    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
  }

  createCharacter() {
    this.createBody();
    this.createHead();
    this.createArmsAndLegs();
    this.createFacialFeatures();
    this.createClothing();
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 10;
    this.controls.target.set(0, 1, 0);
  }

  createBody() {
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.4, 2, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffd7c4,
      roughness: 0.7,
      metalness: 0.1,
    });
    this.body = new THREE.Mesh(bodyGeometry, material);
    this.scene.add(this.body);
  }

  createHead() {
    const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    headGeometry.scale(1, 1.2, 1);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd7c4,
      roughness: 0.7,
      metalness: 0.1,
    });
    this.head = new THREE.Mesh(headGeometry, headMaterial);
    this.head.position.y = 1.2;
    this.body.add(this.head);

    const hairGeometry = new THREE.SphereGeometry(
      0.42,
      32,
      32,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    );
    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a3000,
      roughness: 0.7,
      metalness: 0.1,
    });
    this.hair = new THREE.Mesh(hairGeometry, hairMaterial);
    this.hair.position.y = 0.2;
    this.head.add(this.hair);
  }

  createShirt(style) {
    if (this.leftSleeve) {
      this.body.remove(this.leftSleeve);
      this.body.remove(this.rightSleeve);
    }

    if (this.shirt) {
      this.body.remove(this.shirt);
    }

    let shirtGeometry;
    switch (style) {
      case "sweater":
        shirtGeometry = new THREE.CylinderGeometry(0.55, 0.5, 1.3, 32);
        this.updateArmsForSweater();
        break;
      case "jacket":
        shirtGeometry = new THREE.CylinderGeometry(0.57, 0.52, 1.4, 32);
        this.updateArmsForJacket();
        break;
      case "tank":
        shirtGeometry = new THREE.CylinderGeometry(0.48, 0.43, 1.1, 32);
        this.updateArmsForTank();
        break;
      default:
        shirtGeometry = new THREE.CylinderGeometry(0.52, 0.45, 1.2, 32);

        break;
    }

    const shirtMaterial = new THREE.MeshStandardMaterial({
      color: 0x2196f3,
      roughness: 0.8,
      metalness: 0.1,
    });

    this.shirt = new THREE.Mesh(shirtGeometry, shirtMaterial);
    this.shirt.position.y = 0.2;
    this.body.add(this.shirt);
  }

  createPants(style) {
    if (this.pants) {
      this.body.remove(this.pants);
    }

    let pantsGeometry;
    switch (style) {
      case "shorts":
        pantsGeometry = new THREE.CylinderGeometry(0.42, 0.38, 0.6, 32);
        break;
      case "skirt":
        pantsGeometry = new THREE.CylinderGeometry(0.45, 0.6, 0.8, 32);
        break;
      case "formal":
        pantsGeometry = new THREE.CylinderGeometry(0.42, 0.35, 1.1, 32);
        break;
      default:
        pantsGeometry = new THREE.CylinderGeometry(0.42, 0.35, 1, 32);
    }

    const pantsMaterial = new THREE.MeshStandardMaterial({
      color: 0x424242,
      roughness: 0.8,
      metalness: 0.1,
    });

    this.pants = new THREE.Mesh(pantsGeometry, pantsMaterial);
    this.pants.position.y = -0.8;
    this.body.add(this.pants);
  }

  updateShirtStyle(style) {
    const currentColor = this.shirt.material.color.getHex();
    this.createShirt(style);
    this.updateShirtColor(currentColor);
  }

  updatePantsStyle(style) {
    const currentColor = this.pants.material.color.getHex();
    this.createPants(style);
    this.updatePantsColor(currentColor);
  }
  createArmsAndLegs() {
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
    const armMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd7c4,
      roughness: 0.7,
      metalness: 0.1,
    });

    this.leftArm = new THREE.Mesh(armGeometry, armMaterial);
    this.rightArm = new THREE.Mesh(armGeometry, armMaterial);

    this.leftArm.position.set(-0.6, 0.3, 0);
    this.rightArm.position.set(0.6, 0.3, 0);

    this.leftArm.rotation.z = Math.PI / 6;
    this.rightArm.rotation.z = -Math.PI / 6;

    this.body.add(this.leftArm);
    this.body.add(this.rightArm);

    const legGeometry = new THREE.CylinderGeometry(0.15, 0.1, 1, 32);
    const legMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd7c4,
      roughness: 0.7,
      metalness: 0.1,
    });

    this.leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    this.rightLeg = new THREE.Mesh(legGeometry, legMaterial);

    this.leftLeg.position.set(-0.2, -1.2, 0);
    this.rightLeg.position.set(0.2, -1.2, 0);

    this.body.add(this.leftLeg);
    this.body.add(this.rightLeg);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.controls) {
      this.controls.update();
    }
    this.renderer.render(this.scene, this.camera);
  }

  updateSkinColor(color) {
    const skinParts = [
      this.body.material,
      this.head.material,
      this.leftArm.material,
      this.rightArm.material,
      this.leftLeg.material,
      this.rightLeg.material,
      this.nose.material,
    ];

    skinParts.forEach((material) => {
      material.color.set(color);
    });
  }

  updateHairStyle(style) {
    this.head.remove(this.hair);

    let hairGeometry;
    switch (style) {
      case "long":
        hairGeometry = new THREE.CylinderGeometry(0.42, 0.35, 1, 32, 1, true);
        break;
      case "ponytail":
        hairGeometry = new THREE.Group();
        const topHair = new THREE.Mesh(
          new THREE.SphereGeometry(
            0.42,
            32,
            32,
            0,
            Math.PI * 2,
            0,
            Math.PI / 2
          ),
          new THREE.MeshStandardMaterial({
            color: this.hairColor || 0x4a3000,
            roughness: 0.7,
            metalness: 0.1,
          })
        );
        const tail = new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.05, 0.8, 32),
          new THREE.MeshStandardMaterial({
            color: this.hairColor || 0x4a3000,
            roughness: 0.7,
            metalness: 0.1,
          })
        );
        topHair.position.y = 0.2;
        tail.position.set(0, -0.2, 0.3);
        tail.rotation.x = Math.PI / 3;
        hairGeometry.add(topHair);
        hairGeometry.add(tail);
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
      color: this.hairColor || 0x4a3000,
      roughness: 0.7,
      metalness: 0.1,
    });

    if (style === "ponytail") {
      this.hair = hairGeometry;
    } else {
      this.hair = new THREE.Mesh(hairGeometry, hairMaterial);
    }

    this.hair.position.y = 0.2;
    this.head.add(this.hair);
  }

  updateHairColor(color) {
    this.hairColor = color;
    if (this.hair instanceof THREE.Group) {
      this.hair.children.forEach((part) => {
        part.material.color.set(color);
      });
    } else {
      this.hair.material.color.set(color);
    }

    this.leftBrow.material.color.set(color);
    this.rightBrow.material.color.set(color);
  }

  updateEyeColor(color) {
    this.leftEye.material.color.set(color);
    this.rightEye.material.color.set(color);
  }

  setExpression(type) {
    switch (type) {
      case "smile":
        this.mouth.rotation.z = 0;
        this.mouth.scale.x = 1.2;
        this.mouth.scale.y = 1;
        this.mouth.position.y = -0.15;

        this.leftBrow.position.y = 0.25;
        this.rightBrow.position.y = 0.25;
        break;
      case "sad":
        this.mouth.rotation.z = Math.PI;
        this.mouth.scale.x = 0.8;
        this.mouth.scale.y = 1;
        this.mouth.position.y = -0.2;

        this.leftBrow.rotation.z = -0.2;
        this.rightBrow.rotation.z = 0.2;
        this.leftBrow.position.y = 0.15;
        this.rightBrow.position.y = 0.15;
        break;
      case "neutral":
        this.mouth.rotation.z = 0;
        this.mouth.scale.x = 0.7;
        this.mouth.scale.y = 1;
        this.mouth.position.y = -0.1;

        this.leftBrow.rotation.z = 0;
        this.rightBrow.rotation.z = 0;
        this.leftBrow.position.y = 0.2;
        this.rightBrow.position.y = 0.2;
        break;
    }
  }

  createFacialFeatures() {
    const noseGeometry = new THREE.ConeGeometry(0.08, 0.2, 32);
    const noseMaterial = new THREE.MeshStandardMaterial({ color: 0xffd7c4 });
    this.nose = new THREE.Mesh(noseGeometry, noseMaterial);
    this.nose.rotation.x = -Math.PI / 2;
    this.nose.position.set(0, 0, 0.4);
    this.head.add(this.nose);

    const mouthGeometry = new THREE.TorusGeometry(0.1, 0.02, 16, 32, Math.PI);
    const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0xff9999 });
    this.mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    this.mouth.rotation.x = -Math.PI / 2;
    this.mouth.position.set(0, -0.1, 0.4);
    this.head.add(this.mouth);

    const eyeGeometry = new THREE.SphereGeometry(0.05, 32, 32);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x3f6fb8 });

    this.leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    this.rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);

    this.leftEye.position.set(-0.2, 0.1, 0.4);
    this.rightEye.position.set(0.2, 0.1, 0.4);

    this.head.add(this.leftEye);
    this.head.add(this.rightEye);

    const browGeometry = new THREE.BoxGeometry(0.15, 0.03, 0.03);
    const browMaterial = new THREE.MeshStandardMaterial({ color: 0x4a3000 });

    this.leftBrow = new THREE.Mesh(browGeometry, browMaterial);
    this.rightBrow = new THREE.Mesh(browGeometry, browMaterial);

    this.leftBrow.position.set(-0.2, 0.2, 0.4);
    this.rightBrow.position.set(0.2, 0.2, 0.4);

    this.head.add(this.leftBrow);
    this.head.add(this.rightBrow);
  }

  createClothing() {
    this.createShirt("tshirt");
    this.createPants("jeans");
  }

  updateArmsForTshirt() {
    const sleeveGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 32);
    const sleeveMaterial = new THREE.MeshStandardMaterial({
      color: this.shirt ? this.shirt.material.color : 0x2196f3,
      roughness: 0.8,
      metalness: 0.1,
    });

    this.leftSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
    this.rightSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);

    this.leftSleeve.position.set(-0.65, 0.6, 0);
    this.rightSleeve.position.set(0.65, 0.6, 0);

    this.leftSleeve.rotation.z = Math.PI / 4;
    this.rightSleeve.rotation.z = -Math.PI / 4;

    this.body.add(this.leftSleeve);
    this.body.add(this.rightSleeve);
  }

  updateArmsForSweater() {
    const sleeveGeometry = new THREE.CylinderGeometry(0.12, 0.1, 0.8, 32);
    const sleeveMaterial = new THREE.MeshStandardMaterial({
      color: this.shirt ? this.shirt.material.color : 0x2196f3,
      roughness: 0.8,
      metalness: 0.1,
    });

    this.leftSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
    this.rightSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);

    this.leftSleeve.position.set(-0.6, 0.3, 0);
    this.rightSleeve.position.set(0.6, 0.3, 0);

    this.leftSleeve.rotation.z = Math.PI / 6;
    this.rightSleeve.rotation.z = -Math.PI / 6;

    this.body.add(this.leftSleeve);
    this.body.add(this.rightSleeve);
  }

  updateArmsForJacket() {
    const sleeveGeometry = new THREE.CylinderGeometry(0.15, 0.13, 0.8, 32);
    const sleeveMaterial = new THREE.MeshStandardMaterial({
      color: this.shirt ? this.shirt.material.color : 0x2196f3,
      roughness: 0.8,
      metalness: 0.1,
    });

    this.leftSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
    this.rightSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);

    this.leftSleeve.position.set(-0.6, 0.3, 0);
    this.rightSleeve.position.set(0.6, 0.3, 0);

    this.leftSleeve.rotation.z = Math.PI / 6;
    this.rightSleeve.rotation.z = -Math.PI / 6;

    this.body.add(this.leftSleeve);
    this.body.add(this.rightSleeve);
  }

  updateArmsForTank() {
    if (this.leftSleeve) {
      this.body.remove(this.leftSleeve);
      this.body.remove(this.rightSleeve);
    }
  }

  updateShirtColor(color) {
    if (this.shirt) {
      this.shirt.material.color.set(color);
    }
    if (this.leftSleeve) {
      this.leftSleeve.material.color.set(color);
      this.rightSleeve.material.color.set(color);
    }
  }

  updatePantsColor(color) {
    if (this.pants) {
      this.pants.material.color.set(color);
    }
  }

  exportModel() {
    const exporter = new THREE.GLTFExporter();
    exporter.parse(
      this.scene,
      (gltf) => {
        const blob = new Blob([JSON.stringify(gltf)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "character.gltf";
        link.click();
        URL.revokeObjectURL(url);
      },
      { binary: false }
    );
  }

  takeScreenshot() {
    this.renderer.render(this.scene, this.camera);
    const dataURL = this.renderer.domElement.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "character-screenshot.png";
    link.click();
  }

  shareModel() {
    this.renderer.render(this.scene, this.camera);
    const dataURL = this.renderer.domElement.toDataURL("image/png");

    const shareData = {
      title: "3D Character",
      text: "Check out my 3D character!",
      files: [new File([dataURL], "character.png", { type: "image/png" })],
    };

    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(console.error);
    } else {
      alert("Sharing is not supported on this browser/device");
    }
  }
}

window.CharacterModel = CharacterModel;
