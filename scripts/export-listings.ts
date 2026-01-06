/**
 * Export all listings to CSV file
 * 
 * Installation:
 *   npm install -D tsx
 * 
 * Run with:
 *   npx tsx scripts/export-listings.ts
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { DEMO_PRODUCTS } from '../lib/demo/products';

interface ListingRow {
  handle: string;
  title: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  location: string;
  mainImage: string;
  additionalImages: string; // Comma-separated URLs
}

function escapeCsvField(field: string): string {
  // Escape quotes and wrap in quotes if contains comma, newline, or quote
  if (field.includes(',') || field.includes('\n') || field.includes('"')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

function exportListingsToCsv() {
  const rows: ListingRow[] = [];

  DEMO_PRODUCTS.forEach(product => {
    const categoryMeta = product.metafields?.find(m => m.key === 'category');
    const subcategoryMeta = product.metafields?.find(m => m.key === 'subcategory');
    const locationMeta = product.metafields?.find(m => m.key === 'location');

    const category = categoryMeta?.value || '';
    const subcategory = subcategoryMeta?.value || '';
    const location = locationMeta?.value || '';

    // Get main image URL
    const mainImage = product.featuredImage?.url || '';

    // Get additional images (skip first one as it's the main image)
    const additionalImages = product.images
      .filter(img => img.url !== mainImage)
      .map(img => img.url)
      .join(',');

    rows.push({
      handle: product.handle,
      title: product.title,
      description: product.description,
      price: product.priceRange.maxVariantPrice.amount,
      category,
      subcategory,
      location,
      mainImage,
      additionalImages
    });
  });

  // Create CSV header
  const headers = [
    'handle',
    'title',
    'description',
    'price',
    'category',
    'subcategory',
    'location',
    'mainImage',
    'additionalImages'
  ];

  // Create CSV rows
  const csvRows = [
    headers.join(','),
    ...rows.map(row => [
      escapeCsvField(row.handle),
      escapeCsvField(row.title),
      escapeCsvField(row.description),
      escapeCsvField(row.price),
      escapeCsvField(row.category),
      escapeCsvField(row.subcategory),
      escapeCsvField(row.location),
      escapeCsvField(row.mainImage),
      escapeCsvField(row.additionalImages)
    ].join(','))
  ];

  const csvContent = csvRows.join('\n');

  // Write to file
  const outputPath = join(process.cwd(), 'listings-export.csv');
  writeFileSync(outputPath, csvContent, 'utf-8');

  console.log(`✅ Exported ${rows.length} listings to ${outputPath}`);
  console.log(`\n📝 You can now edit the CSV file:`);
  console.log(`   - Update descriptions`);
  console.log(`   - Replace image URLs with new ones`);
  console.log(`   - Add additional image URLs (comma-separated)`);
  console.log(`\n💡 After editing, you'll need to manually update products.ts`);
  console.log(`   Or use a script to import (import-listings.ts)`);
}

exportListingsToCsv();
