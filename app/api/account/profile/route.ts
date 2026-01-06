import { NextRequest, NextResponse } from 'next/server';
import { getDemoUser, updateDemoUser, User } from 'lib/demo/user';

export async function GET() {
  try {
    const user = getDemoUser();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updates = await request.json();
    const updatedUser = updateDemoUser(updates);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

