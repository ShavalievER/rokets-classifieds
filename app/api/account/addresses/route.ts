import { NextRequest, NextResponse } from 'next/server';
import {
  getDemoAddresses,
  addDemoAddress,
  DeliveryAddress
} from 'lib/demo/user';

export async function GET() {
  try {
    const addresses = getDemoAddresses();
    return NextResponse.json(addresses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch addresses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const addressData = await request.json();
    const newAddress = addDemoAddress(addressData as Omit<DeliveryAddress, 'id'>);
    return NextResponse.json(newAddress, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add address' }, { status: 500 });
  }
}

