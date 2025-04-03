import { NextResponse } from 'next/server';
import { getUsers, createUser, getUserByEmail } from '@/lib/db';

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, age } = await request.json();
    if (!name || !email || !age) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    const newUser = await createUser(name, email, age);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}