/**
 * Import listings from CSV file and update products.ts
 * Run with: npx tsx scripts/import-listings.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface ListingRow {
  handle: string;
  title: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  location: string;
  mainImage: string;
  additionalImages: string;
}

function parseCsvField(field: string): string {
  // Remove quotes if present
  if (field.startsWith('"') && field.endsWith('"')) {
    return field.slice(1, -1).replace(/""/g, '"');
  }
  return field;
}

function parseCsv(csvContent: string): ListingRow[] {
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];
  
  const firstLine = lines[0];
  if (!firstLine) return [];
  
  const headers = firstLine.split(',').map(h => parseCsvField(h.trim()));
  
  const rows: ListingRow[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    
    const values: string[] = [];
    let currentValue = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      const nextChar = line[j + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentValue += '"';
          j++; // Skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(parseCsvField(currentValue));
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(parseCsvField(currentValue)); // Add last value
    
    if (values.length === headers.length) {
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      rows.push(row as ListingRow);
    }
  }
  
  return rows;
}

function importListingsFromCsv() {
  const csvPath = join(process.cwd(), 'listings-export.csv');
  
  try {
    const csvContent = readFileSync(csvPath, 'utf-8');
    const listings = parseCsv(csvContent);
    
    console.log(`📥 Found ${listings.length} listings in CSV file`);
    
    // Read current products.ts file
    const productsPath = join(process.cwd(), 'lib', 'demo', 'products.ts');
    let productsContent = readFileSync(productsPath, 'utf-8');
    
    // Create a map of handle -> listing for quick lookup
    const listingsMap = new Map<string, ListingRow>();
    listings.forEach(listing => {
      listingsMap.set(listing.handle, listing);
    });
    
    // Update PRODUCT_TEMPLATES with new data
    // We need to group listings by subcategory and update templates
    const subcategoryGroups = new Map<string, ListingRow[]>();
    
    listings.forEach(listing => {
      const key = `${listing.category}-${listing.subcategory}`;
      if (!subcategoryGroups.has(key)) {
        subcategoryGroups.set(key, []);
      }
      subcategoryGroups.get(key)!.push(listing);
    });
    
    // For each subcategory group, update the template
    let updatedCount = 0;
    
    subcategoryGroups.forEach((groupListings, key) => {
      // Sort by handle to maintain order
      groupListings.sort((a, b) => {
        const aNum = parseInt(a.handle.split('-').pop() || '0');
        const bNum = parseInt(b.handle.split('-').pop() || '0');
        return aNum - bNum;
      });
      
      const firstListing = groupListings[0];
      if (!firstListing) return;
      
      const subcategoryHandle = firstListing.subcategory;
      
      // Find and update the template in products.ts
      const templateRegex = new RegExp(
        `('${subcategoryHandle.replace(/-/g, '\\-')}':\\s*{[^}]*titles:\\s*\\[[^\\]]*\\][^}]*descriptions:\\s*\\[[^\\]]*\\][^}]*imageBase:[^}]*})`,
        's'
      );
      
      // Build new template
      const titles = groupListings.map(l => l.title);
      const descriptions = groupListings.map(l => l.description);
      const prices = groupListings.map(l => parseFloat(l.price));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      // Get imageBase from first listing's main image (extract base term)
      const firstImage = firstListing.mainImage;
      const imageBase = firstImage.includes('placehold.co') 
        ? subcategoryHandle.split('-')[0] // Use first part of subcategory handle
        : 'product'; // Default
      
      const newTemplate = `'${subcategoryHandle}': {
    titles: [${titles.map(t => `'${t.replace(/'/g, "\\'")}'`).join(', ')}],
    descriptions: [${descriptions.map(d => `'${d.replace(/'/g, "\\'").replace(/\n/g, ' ')}'`).join(',\n      ')}],
    priceRange: [${Math.floor(minPrice)}, ${Math.ceil(maxPrice)}],
    imageBase: '${imageBase}'
  }`;
      
      if (templateRegex.test(productsContent)) {
        productsContent = productsContent.replace(templateRegex, newTemplate);
        updatedCount += groupListings.length;
      }
    });
    
    // Write updated content back
    writeFileSync(productsPath, productsContent, 'utf-8');
    
    console.log(`✅ Updated ${updatedCount} listings in products.ts`);
    console.log(`\n⚠️  Note: Image URLs need to be updated manually in the generateProducts() function`);
    console.log(`   The script updated titles, descriptions, and price ranges.`);
    console.log(`   You'll need to update the image URL generation logic to use your new image URLs.`);
    
  } catch (error) {
    console.error('❌ Error importing listings:', error);
    console.error('\nMake sure listings-export.csv exists in the project root.');
  }
}

importListingsFromCsv();

