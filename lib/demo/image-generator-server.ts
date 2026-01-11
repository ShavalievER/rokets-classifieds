// Server-side image generator using OpenAI DALL-E
// This file should only be used on the server side

import OpenAI from 'openai';

// Initialize OpenAI client (only on server)
const openai = typeof process !== 'undefined' && process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  : null;

/**
 * Generate image using OpenAI DALL-E (server-side only)
 * @param productTitle - Product title
 * @param category - Product category
 * @returns URL of the generated image, or null if generation fails
 */
export async function generateImageWithAIServer(
  productTitle: string,
  category: string
): Promise<string | null> {
  // Check if OpenAI is configured
  if (!openai || !process.env.OPENAI_API_KEY) {
    return null;
  }

  try {
    // Create a descriptive prompt for the product
    const prompt = `A professional product photograph of ${productTitle} in the ${category} category. Clean background, well-lit, e-commerce style, high quality, realistic, no watermarks, no text`;
    
    // Generate image using DALL-E 3
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
    console.error('Error generating image with OpenAI:', error);
    
    // Log specific error types for debugging
    if (error instanceof Error) {
      if (error.message.includes('rate_limit')) {
        console.warn('OpenAI rate limit exceeded');
      } else if (error.message.includes('insufficient_quota')) {
        console.warn('OpenAI insufficient quota');
      } else if (error.message.includes('content_policy')) {
        console.warn('OpenAI content policy violation');
      }
    }
    
    return null;
  }
}



