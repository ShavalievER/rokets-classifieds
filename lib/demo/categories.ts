import type { Collection } from 'lib/shopify/types';

/**
 * Two-level category structure for classifieds
 * Based on: https://docs.google.com/spreadsheets/d/1Z8D7fMD_Nyo2BOj6Ua3PYdJI4LTFo5h5q9e3SdDogPc/edit
 */

// Helper function to create handle from name
function createHandle(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export type CategoryStructure = {
  id: string;
  name: string;
  handle: string;
  subcategories?: {
    id: string;
    name: string;
    handle: string;
  }[];
};

export const CATEGORY_STRUCTURE: CategoryStructure[] = [
  {
    id: 'furniture',
    name: 'Furniture',
    handle: 'furniture',
    subcategories: [
      { id: 'sofas-couches', name: 'Sofas & Couches', handle: 'sofas-couches' },
      { id: 'armchairs', name: 'Armchairs', handle: 'armchairs' },
      { id: 'recliners', name: 'Recliners', handle: 'recliners' },
      { id: 'sofa-beds', name: 'Sofa Beds', handle: 'sofa-beds' },
      { id: 'living-room-sets', name: 'Living Room Sets', handle: 'living-room-sets' },
      { id: 'tv-stands-media-units', name: 'TV Stands & Media Units', handle: 'tv-stands-media-units' },
      { id: 'coffee-tables', name: 'Coffee Tables', handle: 'coffee-tables' },
      { id: 'side-tables', name: 'Side Tables', handle: 'side-tables' },
      { id: 'dining-tables', name: 'Dining Tables', handle: 'dining-tables' },
      { id: 'dining-chairs', name: 'Dining Chairs', handle: 'dining-chairs' },
      { id: 'dining-sets', name: 'Dining Sets', handle: 'dining-sets' },
      { id: 'beds', name: 'Beds', handle: 'beds' },
      { id: 'mattresses', name: 'Mattresses', handle: 'mattresses' },
      { id: 'bed-frames', name: 'Bed Frames', handle: 'bed-frames' },
      { id: 'wardrobes', name: 'Wardrobes', handle: 'wardrobes' },
      { id: 'dressers-chests', name: 'Dressers & Chests', handle: 'dressers-chests' },
      { id: 'nightstands', name: 'Nightstands', handle: 'nightstands' },
      { id: 'bedroom-sets', name: 'Bedroom Sets', handle: 'bedroom-sets' },
      { id: 'office-desks', name: 'Office Desks', handle: 'office-desks' },
      { id: 'office-chairs', name: 'Office Chairs', handle: 'office-chairs' },
      { id: 'bookcases-shelves', name: 'Bookcases & Shelves', handle: 'bookcases-shelves' },
      { id: 'cabinets-sideboards', name: 'Cabinets & Sideboards', handle: 'cabinets-sideboards' },
      { id: 'shoe-racks', name: 'Shoe Racks', handle: 'shoe-racks' },
      { id: 'storage-units', name: 'Storage Units', handle: 'storage-units' },
      { id: 'kids-furniture', name: 'Kids Furniture', handle: 'kids-furniture' },
      { id: 'outdoor-furniture', name: 'Outdoor Furniture', handle: 'outdoor-furniture' },
      { id: 'garden-tables-chairs', name: 'Garden Tables & Chairs', handle: 'garden-tables-chairs' },
      { id: 'balcony-furniture', name: 'Balcony Furniture', handle: 'balcony-furniture' },
      { id: 'bar-furniture', name: 'Bar Furniture', handle: 'bar-furniture' },
      { id: 'mirrors', name: 'Mirrors', handle: 'mirrors' }
    ]
  },
  {
    id: 'sporting-goods',
    name: 'Sporting Goods',
    handle: 'sporting-goods',
    subcategories: [
      { id: 'scooters-skateboards', name: 'Scooters & Skateboards', handle: 'scooters-skateboards' },
      { id: 'running-athletics', name: 'Running & Athletics', handle: 'running-athletics' },
      { id: 'swimming-water-sports', name: 'Swimming & Water Sports', handle: 'swimming-water-sports' },
      { id: 'diving-snorkeling', name: 'Diving & Snorkeling', handle: 'diving-snorkeling' },
      { id: 'surfing-paddleboarding', name: 'Surfing & Paddleboarding', handle: 'surfing-paddleboarding' },
      { id: 'fishing', name: 'Fishing', handle: 'fishing' },
      { id: 'hunting-archery', name: 'Hunting & Archery', handle: 'hunting-archery' },
      { id: 'outdoor-camping', name: 'Outdoor & Camping', handle: 'outdoor-camping' },
      { id: 'hiking-trekking', name: 'Hiking & Trekking', handle: 'hiking-trekking' },
      { id: 'climbing-mountaineering', name: 'Climbing & Mountaineering', handle: 'climbing-mountaineering' },
      { id: 'winter-sports', name: 'Winter Sports', handle: 'winter-sports' },
      { id: 'skiing', name: 'Skiing', handle: 'skiing' },
      { id: 'snowboarding', name: 'Snowboarding', handle: 'snowboarding' },
      { id: 'golf-equipment', name: 'Golf Equipment', handle: 'golf-equipment' },
      { id: 'equestrian-sports', name: 'Equestrian Sports', handle: 'equestrian-sports' },
      { id: 'motorsports-gear', name: 'Motorsports Gear', handle: 'motorsports-gear' },
      { id: 'accessories-protection', name: 'Accessories & Protection', handle: 'accessories-protection' },
      { id: 'sports-bags', name: 'Sports Bags', handle: 'sports-bags' },
      { id: 'sports-nutrition', name: 'Sports Nutrition', handle: 'sports-nutrition' },
      { id: 'recovery-physiotherapy', name: 'Recovery & Physiotherapy', handle: 'recovery-physiotherapy' },
      { id: 'kids-sports-equipment', name: 'Kids Sports Equipment', handle: 'kids-sports-equipment' },
      { id: 'refurbished-used-equipment', name: 'Refurbished / Used Equipment', handle: 'refurbished-used-equipment' },
      { id: 'professional-commercial-equipment', name: 'Professional / Commercial Equipment', handle: 'professional-commercial-equipment' },
      { id: 'other-sporting-goods', name: 'Other Sporting Goods', handle: 'other-sporting-goods' }
    ]
  },
  {
    id: 'toys',
    name: 'Toys',
    handle: 'toys',
    subcategories: [
      { id: 'baby-toys-0-2-years', name: 'Baby Toys (0–2 years)', handle: 'baby-toys-0-2-years' },
      { id: 'toddler-toys-2-4-years', name: 'Toddler Toys (2–4 years)', handle: 'toddler-toys-2-4-years' },
      { id: 'preschool-toys-4-6-years', name: 'Preschool Toys (4–6 years)', handle: 'preschool-toys-4-6-years' },
      { id: 'educational-learning-toys', name: 'Educational & Learning Toys', handle: 'educational-learning-toys' },
      { id: 'montessori-toys', name: 'Montessori Toys', handle: 'montessori-toys' }
    ]
  },
  {
    id: 'auto-parts',
    name: 'Auto Parts',
    handle: 'auto-parts',
    subcategories: [
      { id: 'engine-parts', name: 'Engine Parts', handle: 'engine-parts' },
      { id: 'body-parts', name: 'Body Parts', handle: 'body-parts' },
      { id: 'interior-parts', name: 'Interior Parts', handle: 'interior-parts' },
      { id: 'tires-wheels', name: 'Tires & Wheels', handle: 'tires-wheels' },
      { id: 'electronics-parts', name: 'Electronics & Parts', handle: 'electronics-parts' },
      { id: 'accessories', name: 'Accessories', handle: 'accessories' }
    ]
  },
  {
    id: 'babies',
    name: 'Babies',
    handle: 'babies',
    subcategories: [
      { id: 'baby-clothing', name: 'Baby Clothing', handle: 'baby-clothing' },
      { id: 'baby-gear', name: 'Baby Gear', handle: 'baby-gear' },
      { id: 'nursery-furniture', name: 'Nursery Furniture', handle: 'nursery-furniture' },
      { id: 'feeding', name: 'Feeding', handle: 'feeding' },
      { id: 'strollers-carriers', name: 'Strollers & Carriers', handle: 'strollers-carriers' },
      { id: 'baby-safety', name: 'Baby Safety', handle: 'baby-safety' }
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing',
    handle: 'clothing',
    subcategories: [
      { id: 'mens-clothing', name: "Men's Clothing", handle: 'mens-clothing' },
      { id: 'womens-clothing', name: "Women's Clothing", handle: 'womens-clothing' },
      { id: 'kids-clothing', name: "Kids' Clothing", handle: 'kids-clothing' },
      { id: 'shoes', name: 'Shoes', handle: 'shoes' },
      { id: 'accessories', name: 'Accessories', handle: 'accessories' },
      { id: 'bags-luggage', name: 'Bags & Luggage', handle: 'bags-luggage' }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    handle: 'electronics',
    subcategories: [
      { id: 'mobile-phones', name: 'Mobile Phones', handle: 'mobile-phones' },
      { id: 'computers', name: 'Computers & Tablets', handle: 'computers' },
      { id: 'tv-video', name: 'TV, Audio & Video', handle: 'tv-video' },
      { id: 'cameras', name: 'Cameras', handle: 'cameras' },
      { id: 'gaming', name: 'Gaming', handle: 'gaming' },
      { id: 'audio', name: 'Audio Equipment', handle: 'audio' }
    ]
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    handle: 'home-garden',
    subcategories: [
      { id: 'home-decor', name: 'Home Decor', handle: 'home-decor' },
      { id: 'kitchen-dining', name: 'Kitchen & Dining', handle: 'kitchen-dining' },
      { id: 'bedding-bath', name: 'Bedding & Bath', handle: 'bedding-bath' },
      { id: 'garden-tools', name: 'Garden Tools', handle: 'garden-tools' },
      { id: 'outdoor-living', name: 'Outdoor Living', handle: 'outdoor-living' },
      { id: 'home-improvement', name: 'Home Improvement', handle: 'home-improvement' }
    ]
  },
  {
    id: 'fashion-beauty',
    name: 'Fashion & Beauty',
    handle: 'fashion-beauty',
    subcategories: [
      { id: 'cosmetics', name: 'Cosmetics', handle: 'cosmetics' },
      { id: 'skincare', name: 'Skincare', handle: 'skincare' },
      { id: 'fragrances', name: 'Fragrances', handle: 'fragrances' },
      { id: 'hair-care', name: 'Hair Care', handle: 'hair-care' },
      { id: 'jewelry', name: 'Jewelry', handle: 'jewelry' },
      { id: 'watches', name: 'Watches', handle: 'watches' }
    ]
  }
];

// Generate category names mapping for backward compatibility
export const CATEGORY_NAMES: Record<string, string> = {};

// Populate CATEGORY_NAMES from CATEGORY_STRUCTURE
CATEGORY_STRUCTURE.forEach(category => {
  CATEGORY_NAMES[category.handle] = category.name;
  category.subcategories?.forEach(sub => {
    CATEGORY_NAMES[sub.handle] = sub.name;
  });
});

// Generate flat collections list for compatibility
export const DEMO_COLLECTIONS: Collection[] = CATEGORY_STRUCTURE.flatMap(category => {
  const collections: Collection[] = [];
  
  // Add main category
  collections.push({
    handle: category.handle,
    title: category.name,
    description: `${category.name} category`,
    seo: {
      title: category.name,
      description: `${category.name} category`
    },
    path: `/search/${category.handle}`,
    updatedAt: new Date().toISOString()
  });
  
  // Add subcategories
  if (category.subcategories) {
    category.subcategories.forEach(sub => {
      collections.push({
        handle: sub.handle,
        title: sub.name,
        description: `${sub.name} in ${category.name}`,
        seo: {
          title: sub.name,
          description: `${sub.name} in ${category.name}`
        },
        path: `/search/${category.handle}/${sub.handle}`,
        updatedAt: new Date().toISOString()
      });
    });
  }
  
  return collections;
});

export function getCategoryName(handle: string): string {
  return CATEGORY_NAMES[handle] || handle;
}

export function getCategoryByHandle(handle: string): CategoryStructure | undefined {
  return CATEGORY_STRUCTURE.find(cat => cat.handle === handle);
}

export function getSubcategoryByHandle(categoryHandle: string, subcategoryHandle: string) {
  const category = getCategoryByHandle(categoryHandle);
  return category?.subcategories?.find(sub => sub.handle === subcategoryHandle);
}

export function getAllSubcategories(): Array<{ id: string; name: string; handle: string; parentHandle: string }> {
  return CATEGORY_STRUCTURE.flatMap(category =>
    (category.subcategories || []).map(sub => ({
      ...sub,
      parentHandle: category.handle
    }))
  );
}
