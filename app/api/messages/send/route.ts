import { NextRequest, NextResponse } from 'next/server';

type MessageRequest = {
  sellerId: string;
  productHandle: string;
  productTitle: string;
  message: string;
};

// Demo: Store messages in memory (in production, this would be saved to a database)
const messages: Array<MessageRequest & { id: string; timestamp: Date }> = [];

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as MessageRequest;

    // Validate required fields
    if (!body.sellerId || !body.productHandle || !body.message?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create message
    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...body,
      timestamp: new Date()
    };

    messages.push(newMessage);

    // In production, you would:
    // 1. Save message to database
    // 2. Send notification to seller (email, push notification, etc.)
    // 3. Create conversation thread if it doesn't exist

    return NextResponse.json({
      success: true,
      messageId: newMessage.id,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

// Get messages for a seller (for demo purposes)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sellerId = searchParams.get('sellerId');

  if (!sellerId) {
    return NextResponse.json(
      { error: 'sellerId is required' },
      { status: 400 }
    );
  }

  const sellerMessages = messages.filter(msg => msg.sellerId === sellerId);
  return NextResponse.json(sellerMessages);
}

