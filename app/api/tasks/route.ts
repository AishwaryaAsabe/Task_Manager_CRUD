import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/config/db';
import Task from '../../models/Task';


// Create a task
export async function POST(req: Request) {
  await connectToDatabase();
  const { title, description, completed, user } = await req.json();

  const newTask = new Task({ title, description, completed, user });
  await newTask.save();
  return NextResponse.json(newTask, { status: 201 });
}
export async function GET() {
  await connectToDatabase();
  
  try {
    const tasks = await Task.find();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching tasks" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  
  try {
    const { taskIds } = await req.json();
    if (!taskIds || taskIds.length === 0) {
      return NextResponse.json({ message: "No task IDs provided" }, { status: 400 });
    }

    await Task.deleteMany({ _id: { $in: taskIds } });

    return NextResponse.json({ message: "Tasks deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting tasks" }, { status: 500 });
  }
}