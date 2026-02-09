const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Image extensions to process
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const webpOutput = path.join(PUBLIC_DIR, `${baseName}.webp`);

  try {
    const originalSize = fs.statSync(inputPath).size;

    // Determine quality based on image type
    // Higher quality for hero images, slightly lower for others
    const isHeroImage = baseName.includes('IMG_') || baseName.match(/^[456]$/);
    const webpQuality = isHeroImage ? 85 : 80;

    // Create WebP version (best compression, maintains quality)
    await sharp(inputPath)
      .webp({ 
        quality: webpQuality,
        effort: 6, // Higher effort = better compression
        smartSubsample: true
      })
      .toFile(webpOutput);

    const webpSize = fs.statSync(webpOutput).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

    console.log(`✓ ${path.basename(inputPath)}`);
    console.log(`  Original: ${(originalSize / 1024).toFixed(0)}KB → WebP: ${(webpSize / 1024).toFixed(0)}KB (${savings}% smaller)`);

    return { original: originalSize, webp: webpSize };
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  const files = fs.readdirSync(PUBLIC_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  });

  console.log(`Found ${imageFiles.length} images to optimize\n`);

  let totalOriginal = 0;
  let totalWebp = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(PUBLIC_DIR, file);
    const result = await optimizeImage(inputPath);
    if (result) {
      totalOriginal += result.original;
      totalWebp += result.webp;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  console.log(`   Original total: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   WebP total: ${(totalWebp / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total savings: ${((totalOriginal - totalWebp) / totalOriginal * 100).toFixed(1)}%`);
  console.log('='.repeat(50));
  console.log('\n✅ Optimization complete! WebP images created in public/');
}

main().catch(console.error);
