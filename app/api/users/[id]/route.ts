import { NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUserById(params.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, email, age } = await request.json();
    if (!name || !email || !age) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const updatedUser = await updateUser(params.id, name, email, age);
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteUser(params.id);
    return NextResponse.json({ message: 'User deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}