import { NextRequest, NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '@/lib/db';

// ✅ Correct GET request handler
export async function GET(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
  try {
    const user = await getUserById((await params).id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Correct PUT request handler
export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const { name, email, age } = body;

    if (!name || !email || !age) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const updatedUser = await updateUser((await params).id, name, email, age);
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Correct DELETE request handler
export async function DELETE(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
  try {
    await deleteUser((await params).id);
    return NextResponse.json({ message: 'User deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
