import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  : null;

type GenerateImageRequest = {
  prompt: string;
  size?: '256x256' | '512x512' | '1024x1024';
};

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI is configured
    if (!openai || !process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 503 }
      );
    }

    const body = (await request.json()) as GenerateImageRequest;

    // Validate request
    if (!body.prompt || typeof body.prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Generate image using DALL-E
    const size = body.size || '1024x1024';
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: body.prompt,
      size: size === '1024x1024' ? '1024x1024' : size === '512x512' ? '1024x1024' : '1024x1024', // DALL-E 3 supports 1024x1024, 1792x1024, 1024x1792
      quality: 'standard',
      n: 1
    });

    const imageUrl = response.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      );
    }

    // Return the image URL
    return NextResponse.json({
      url: imageUrl,
      prompt: body.prompt,
      size
    });
  } catch (error: unknown) {
    console.error('Error generating image:', error);
    
    // Handle OpenAI API errors
    if (error instanceof Error) {
      if (error.message.includes('rate_limit')) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      if (error.message.includes('insufficient_quota')) {
        return NextResponse.json(
          { error: 'Insufficient API quota. Please check your OpenAI account.' },
          { status: 402 }
        );
      }
      if (error.message.includes('content_policy')) {
        return NextResponse.json(
          { error: 'Content policy violation. Please modify your prompt.' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}



