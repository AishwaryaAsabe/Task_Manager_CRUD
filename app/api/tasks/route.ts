import { NextResponse } from 'next/server';
import connectToDatabase from '@/config/db';
import Task from '../../models/Task';

// Get all tasks
export async function GET() {
  await connectToDatabase();
  const tasks = await Task.find();
  return NextResponse.json(tasks);
}

// Create a task
export async function POST(req: Request) {
  await connectToDatabase();
  const { title, description, completed, user } = await req.json();

  const newTask = new Task({ title, description, completed, user });
  await newTask.save();
  return NextResponse.json(newTask, { status: 201 });
}

// Bulk delete tasks
export async function DELETE(req: Request) {
  await connectToDatabase();
  const { taskIds } = await req.json(); // Expecting an array of IDs

  if (!taskIds || !taskIds.length) {
    return NextResponse.json({ message: 'No tasks provided for deletion' }, { status: 400 });
  }

  await Task.deleteMany({ _id: { $in: taskIds } });
  return NextResponse.json({ message: 'Tasks deleted successfully' });
}




