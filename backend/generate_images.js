import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const colors = {
  'potato': '#8B6F47',       // Brown
  'wheat': '#F5DEB3',        // Wheat color
  'rice': '#FFFACD',         // Light yellow
  'tomato': '#FF6347',       // Tomato red
  'chillies': '#DC143C',     // Crimson red
  'onion': '#FFE4B5',        // Moccasin (light)
  'carrot': '#FF8C00',       // Dark orange
  'cabbage': '#90EE90',      // Light green
  'cauliflower': '#F0F8FF',  // Alice blue
  'spinach': '#228B22',      // Forest green
  'mango': '#FFD700',        // Gold
  'banana': '#FFFF00',       // Yellow
  'apple': '#DC143C',        // Crimson red
  'papaya': '#FF6347',       // Orange-red
  'pomegranate': '#8B0000',  // Dark red
  'milk': '#FFFFFF',         // White
  'paneer': '#F5F5DC',       // Beige
  'butter': '#FFD700',       // Gold yellow
  'mustard': '#FFDB58',      // Mustard yellow
  'cumin': '#8B6914'         // Dark goldenrod
};

const products = [
  'potato', 'wheat', 'rice', 'tomato', 'chillies', 'onion', 
  'carrot', 'cabbage', 'cauliflower', 'spinach', 'mango', 'banana', 
  'apple', 'papaya', 'pomegranate', 'milk', 'paneer', 'butter', 
  'mustard', 'cumin'
];

const uploadsDir = './uploads';

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

async function generateImage(productName) {
  const color = colors[productName] || '#808080';
  const width = 400;
  const height = 300;
  
  // Create SVG with product name
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color}"/>
      <text x="50%" y="50%" font-size="48" font-weight="bold" fill="white" 
            text-anchor="middle" dominant-baseline="middle" font-family="Arial">
        ${productName.charAt(0).toUpperCase() + productName.slice(1)}
      </text>
      <text x="50%" y="80%" font-size="20" fill="rgba(255,255,255,0.7)" 
            text-anchor="middle" font-family="Arial">
        Product Image
      </text>
    </svg>
  `;
  
  const filename = path.join(uploadsDir, `${productName}.jpg`);
  
  try {
    await sharp(Buffer.from(svg))
      .resize(width, height)
      .jpeg({ quality: 90 })
      .toFile(filename);
    
    return true;
  } catch (error) {
    console.error(`Error creating ${productName}.jpg:`, error.message);
    return false;
  }
}

async function generateAllImages() {
  console.log('\\n=== GENERATING PRODUCT IMAGES ===\\n');
  
  let success = 0;
  let failed = 0;
  
  for (const product of products) {
    const result = await generateImage(product);
    if (result) {
      console.log(`✓ Created: ${product}.jpg`);
      success++;
    } else {
      console.log(`✗ Failed: ${product}.jpg`);
      failed++;
    }
  }
  
  console.log(`\\n=== SUMMARY ===`);
  console.log(`Successfully created: ${success} images`);
  if (failed > 0) {
    console.log(`Failed: ${failed} images`);
  }
  console.log(`\\nAll images saved to: ${path.resolve(uploadsDir)}`);
}

generateAllImages().catch(console.error);
