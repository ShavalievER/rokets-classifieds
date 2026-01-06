import { NextRequest, NextResponse } from 'next/server';
import {
  updateDemoPaymentMethod,
  deleteDemoPaymentMethod,
  PaymentMethod
} from 'lib/demo/user';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();
    const updatedMethod = updateDemoPaymentMethod(id, updates as Partial<PaymentMethod>);
    
    if (!updatedMethod) {
      return NextResponse.json({ error: 'Payment method not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedMethod);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update payment method' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deleteDemoPaymentMethod(id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Payment method not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete payment method' }, { status: 500 });
  }
}

