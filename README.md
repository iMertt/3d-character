# 3D Character Creator

A web-based 3D character customization tool that allows users to create and customize their own 3D characters in real-time.

## Live Demo

Try it out: [3D Character Creator](https://extraordinary-starlight-2a1bf0.netlify.app/)

## Features

- Real-time 3D character customization
- Adjustable physical features:

  - Skin color
  - Hair style (Short, Long, Ponytail)
  - Hair color
  - Eye color

- Clothing options:

  - Shirt styles (T-Shirt, Sweater, Jacket, Tank Top)
  - Pants styles (Jeans, Shorts, Skirt, Formal Pants)
  - Customizable clothing colors

- Facial expressions:

  - Neutral
  - Smile
  - Sad

- Export options:
  - Export as GLTF model

## Getting Started

### Prerequisites

- Modern web browser with WebGL support
- Internet connection (for loading Three.js libraries)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/iMertt/3d-character.git
```

2. Navigate to the project directory:

```bash
cd 3d-character
```

3. Open `index.html` in a web browser or serve it using a local server.

## Usage

1. **Character Customization**

   - Use the control panel on the right to customize your character
   - Changes are reflected in real-time in the 3D viewport

2. **Camera Controls**

   - Rotate: Left mouse button + drag
   - Zoom: Mouse wheel
   - Pan: Right mouse button + drag

3. **Exporting**
   - Click "Export Model" to save as GLTF file

## Technical Details

Built with:

- Three.js for 3D rendering
- ES6 Modules for code organization
- HTML5 and CSS3 for interface

## Project Structure

```
3d-character/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── CharacterModel.js
│   ├── CustomizationManager.js
│   ├── StorageManager.js
│   └── main.js
├── models/
├── textures/
└── assets/
```

## Author

- **iMertt** - [GitHub Profile](https://github.com/iMertt)
