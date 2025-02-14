import { NextResponse } from 'next/server';
import Task from '../../../models/Task';
import connectToDatabase from '@/config/db';

// Update a task
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const updatedTask = await Task.findByIdAndUpdate(params.id, await req.json(), { new: true });
  return NextResponse.json(updatedTask);
}



export async function DELETE(req: Request, context: { params: { id: string } }) {
  await connectToDatabase();

  const { id } = await context.params; 

  if (!id) {
    return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
  }

  try {
    await Task.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
  }
}


