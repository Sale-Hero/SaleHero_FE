const fs = require('fs');
const path = require('path');
const https = require('https');
const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');

// Company logos URLs - using official company brand resources
const companyLogos = {
  'apple': 'https://www.apple.com/ac/globalnav/7/en_US/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__b5er5ngrzxqq_large.svg',
  'amazon': 'https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon-logo.jpg',
  'microsoft': 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
  // ... add URLs for all companies
};

async function downloadAndProcessLogo(companyName, url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const image = await loadImage(response.data);
    
    // Create a square canvas
    const size = 300; // Target size
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Draw image maintaining aspect ratio
    const scale = Math.min(size / image.width, size / image.height);
    const x = (size - image.width * scale) / 2;
    const y = (size - image.height * scale) / 2;
    
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
    
    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(
      path.join(__dirname, '..', 'src', 'assets', 'img', 'companies', `${companyName}-logo.png`),
      buffer
    );
    
    console.log(`Processed ${companyName} logo`);
  } catch (error) {
    console.error(`Error processing ${companyName} logo:`, error);
  }
}

async function main() {
  // Create companies directory if it doesn't exist
  const companiesDir = path.join(__dirname, '..', 'src', 'assets', 'img', 'companies');
  if (!fs.existsSync(companiesDir)) {
    fs.mkdirSync(companiesDir, { recursive: true });
  }
  
  // Process all logos
  for (const [company, url] of Object.entries(companyLogos)) {
    await downloadAndProcessLogo(company, url);
  }
}

main().catch(console.error);
