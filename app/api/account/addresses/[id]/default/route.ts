import { NextRequest, NextResponse } from 'next/server';
import { setDefaultAddress } from 'lib/demo/user';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = setDefaultAddress(id);
    
    if (!success) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set default address' }, { status: 500 });
  }
}

