/**
 * Generate product images using OpenAI DALL-E and save them locally
 * 
 * Installation:
 *   npm install -D tsx dotenv
 * 
 * Run with:
 *   npx tsx scripts/generate-images.ts
 * 
 * Make sure OPENAI_API_KEY is set in .env.local
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import OpenAI from 'openai';

// Load environment variables from .env.local
const envPath = join(process.cwd(), '.env.local');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split(/\r?\n/).forEach(line => {
    // Remove comments and trim
    const cleanLine = line.split('#')[0]?.trim() || '';
    // Skip empty lines
    if (!cleanLine) return;
    
    // Match KEY=VALUE pattern
    const match = cleanLine.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1]?.trim();
      const value = match[2]?.trim();
      // Remove quotes if present
      const cleanValue = value?.replace(/^["']|["']$/g, '') || '';
      if (key && cleanValue) {
        process.env[key] = cleanValue;
      }
    }
  });
  
  // Debug: show if key was loaded
  if (process.env.OPENAI_API_KEY) {
    console.log('✅ OPENAI_API_KEY loaded from .env.local');
  }
}

// Initialize OpenAI client
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('❌ OPENAI_API_KEY not found in .env.local');
  console.error('Please add OPENAI_API_KEY to .env.local file');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: apiKey
});

// Import products
import { DEMO_PRODUCTS } from '../lib/demo/products';

/**
 * Download image from URL and save to file
 */
async function downloadAndSaveImage(imageUrl: string, filePath: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error(`Failed to download image: ${response.statusText}`);
      return false;
    }
    
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(filePath, buffer);
    return true;
  } catch (error) {
    console.error(`Error downloading image:`, error);
    return false;
  }
}

/**
 * Generate image for a product using OpenAI DALL-E
 */
async function generateProductImage(
  productTitle: string,
  productDescription: string,
  category: string
): Promise<string | null> {
  try {
    // Create a descriptive prompt based on product description
    const prompt = `A professional product photograph of ${productTitle}. ${productDescription.substring(0, 200)}. Clean white or neutral background, well-lit, e-commerce style, high quality, realistic, no watermarks, no text, professional photography`;
    
    console.log(`  Generating image for: ${productTitle}`);
    
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      size: '1024x1024',
      quality: 'standard',
      n: 1
    });

    const imageUrl = response.data?.[0]?.url;
    return imageUrl || null;
  } catch (error: unknown) {
    console.error(`  Error generating image:`, error);
    if (error instanceof Error) {
      if (error.message.includes('rate_limit')) {
        console.warn('  ⚠️  Rate limit exceeded. Please wait and try again later.');
      } else if (error.message.includes('insufficient_quota')) {
        console.warn('  ⚠️  Insufficient API quota. Please check your OpenAI account.');
      } else if (error.message.includes('content_policy')) {
        console.warn('  ⚠️  Content policy violation. Skipping this product.');
      }
    }
    return null;
  }
}

/**
 * Generate images for all products
 */
async function generateAllImages() {
  console.log('🚀 Starting image generation...\n');
  
  // Ensure products directory exists
  const productsDir = join(process.cwd(), 'public', 'products');
  if (!existsSync(productsDir)) {
    mkdirSync(productsDir, { recursive: true });
    console.log(`📁 Created directory: ${productsDir}\n`);
  }

  // Use loaded products
  const products = DEMO_PRODUCTS;
  console.log(`📦 Found ${products.length} products to process\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (!product) continue;
    
    const imagePath = join(productsDir, `${product.handle}.jpg`);
    
    // Skip if image already exists
    if (existsSync(imagePath)) {
      console.log(`⏭️  [${i + 1}/${products.length}] Skipping ${product.handle} - image already exists`);
      skipCount++;
      continue;
    }

    // Get category from metafields
    const categoryMeta = product.metafields?.find(m => m.key === 'category');
    const category = categoryMeta?.value || 'Product';

    console.log(`🎨 [${i + 1}/${products.length}] Processing: ${product.title}`);

    // Generate image
    const imageUrl = await generateProductImage(
      product.title,
      product.description,
      category
    );

    if (!imageUrl) {
      console.log(`  ❌ Failed to generate image\n`);
      errorCount++;
      // Add a small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
      continue;
    }

    // Download and save image
    const saved = await downloadAndSaveImage(imageUrl, imagePath);
    
    if (saved) {
      console.log(`  ✅ Image saved: ${product.handle}.jpg\n`);
      successCount++;
    } else {
      console.log(`  ❌ Failed to save image\n`);
      errorCount++;
    }

    // Add delay to avoid rate limits (DALL-E 3 has rate limits)
    // Wait 1 second between requests
    if (i < products.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('\n📊 Summary:');
  console.log(`  ✅ Success: ${successCount}`);
  console.log(`  ⏭️  Skipped: ${skipCount}`);
  console.log(`  ❌ Errors: ${errorCount}`);
  console.log(`  📦 Total: ${products.length}`);
  
  if (successCount > 0) {
    console.log(`\n✨ Images saved to: ${productsDir}`);
    console.log('\n💡 Next step: Update products.ts to use saved images');
  }
}

// Run the script
generateAllImages().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

