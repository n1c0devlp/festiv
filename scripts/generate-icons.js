const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const SPLASH_SCREENS = [
  { width: 2048, height: 2732 },
  { width: 1668, height: 2388 },
  { width: 1536, height: 2048 },
  { width: 1125, height: 2436 },
  { width: 1242, height: 2688 }
];

// Création des dossiers nécessaires
const createDirs = () => {
  const dirs = ['public/icons', 'public/splash'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Génération de l'icône de base avec un F stylisé
const generateBaseIcon = async () => {
  const size = 512;
  const centerX = size / 2;
  const centerY = size / 2;

  // Création d'un SVG avec un F stylisé
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#800080"/>
      <text 
        x="${centerX}" 
        y="${centerY}" 
        font-family="Arial" 
        font-size="${size * 0.6}"
        font-weight="bold"
        fill="white"
        text-anchor="middle"
        dominant-baseline="central"
      >F</text>
    </svg>
  `;

  // Sauvegarde de l'icône de base
  await sharp(Buffer.from(svg))
    .png()
    .toFile('public/icons/base-icon.png');
};

// Génération des icônes aux différentes tailles
const generateIcons = async () => {
  const baseIcon = 'public/icons/base-icon.png';
  
  for (const size of ICON_SIZES) {
    await sharp(baseIcon)
      .resize(size, size)
      .png()
      .toFile(`public/icons/icon-${size}x${size}.png`);
    console.log(`Icône ${size}x${size} générée`);
  }
};

// Génération des écrans de démarrage
const generateSplashScreens = async () => {
  const baseIcon = 'public/icons/base-icon.png';
  
  for (const screen of SPLASH_SCREENS) {
    // Création d'un fond violet
    const background = await sharp({
      create: {
        width: screen.width,
        height: screen.height,
        channels: 4,
        background: { r: 128, g: 0, b: 128, alpha: 1 }
      }
    })
    .png()
    .toBuffer();

    // Ajout de l'icône au centre
    const iconSize = Math.min(screen.width, screen.height) * 0.3;
    await sharp(background)
      .composite([{
        input: await sharp(baseIcon)
          .resize(Math.round(iconSize), Math.round(iconSize))
          .toBuffer(),
        gravity: 'center'
      }])
      .png()
      .toFile(`public/splash/apple-splash-${screen.width}-${screen.height}.png`);
    
    console.log(`Écran de démarrage ${screen.width}x${screen.height} généré`);
  }
};

// Exécution de la génération
const generate = async () => {
  try {
    createDirs();
    await generateBaseIcon();
    await generateIcons();
    await generateSplashScreens();
    // Nettoyage de l'icône de base
    fs.unlinkSync('public/icons/base-icon.png');
    console.log('Génération terminée avec succès !');
  } catch (error) {
    console.error('Erreur lors de la génération :', error);
  }
};

generate(); 