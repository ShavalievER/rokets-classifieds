// Simple image generator for demo products
// Generates SVG placeholder images with product information
// These can be replaced with GenAI-generated images later

export function generateProductImage(productTitle: string, category: string): string {
  // Create a simple SVG image with product title
  // This is a placeholder - in production, use GenAI or real images
  
  // Clean title for display
  const displayTitle = productTitle.length > 30 
    ? productTitle.substring(0, 27) + '...' 
    : productTitle;
  
  // Generate a simple color based on title hash
  const hash = simpleHash(productTitle + category);
  const hue = hash % 360;
  const saturation = 60 + (hash % 20);
  const lightness = 50 + (hash % 15);
  
  const bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const textColor = lightness > 55 ? '#1a1a1a' : '#ffffff';
  
  // Create SVG data URL
  const svg = `
<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="${bgColor}"/>
  <text x="400" y="380" font-family="Arial, sans-serif" font-size="32" font-weight="bold" 
        text-anchor="middle" fill="${textColor}">
    ${escapeXml(displayTitle)}
  </text>
  <text x="400" y="430" font-family="Arial, sans-serif" font-size="20" 
        text-anchor="middle" fill="${textColor}" opacity="0.8">
    ${escapeXml(category)}
  </text>
</svg>`.trim();
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

// Alternative: Generate image using a service (placeholder for GenAI integration)
export async function generateImageWithAI(prompt: string): Promise<string> {
  // TODO: Integrate with GenAI service (OpenAI DALL-E, Stable Diffusion, etc.)
  // For now, return a placeholder
  throw new Error('GenAI integration not implemented yet. Use generateProductImage instead.');
}

