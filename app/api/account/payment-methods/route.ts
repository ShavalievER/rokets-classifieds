import { NextRequest, NextResponse } from 'next/server';
import {
  getDemoPaymentMethods,
  addDemoPaymentMethod,
  PaymentMethod
} from 'lib/demo/user';

export async function GET() {
  try {
    const methods = getDemoPaymentMethods();
    return NextResponse.json(methods);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payment methods' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const methodData = await request.json();
    const newMethod = addDemoPaymentMethod(methodData as Omit<PaymentMethod, 'id'>);
    return NextResponse.json(newMethod, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add payment method' }, { status: 500 });
  }
}

