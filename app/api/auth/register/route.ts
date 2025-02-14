import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/config/db';
import User from '../../../models/User';

export async function POST(req: Request) {
  await connectToDatabase();
  const { username, email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}
