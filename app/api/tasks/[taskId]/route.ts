import { NextRequest, NextResponse } from "next/server";
import Task from "../../../models/Task"; // Ensure correct path
import connectToDatabase from "@/config/db";



export async function GET(req: NextRequest, context: { params: Promise<{ taskId: string }> }) {
  await connectToDatabase();

  
  const { taskId } = await context.params;

  if (!taskId) {
    return NextResponse.json({ message: "Task ID is missing" }, { status: 400 });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json({ message: "Error retrieving task" }, { status: 500 });
  }
}





// UPDATE a specific task
export async function PUT(req: NextRequest, { params }: { params: { taskId: string } }) {
  await connectToDatabase();
  const { taskId } = params;

  try {
    const { title, description } = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description }, { new: true });

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating task" }, { status: 500 });
  }
}

// DELETE a specific task
export async function DELETE(req: NextRequest, { params }: { params: { taskId: string } }) {
  await connectToDatabase();
  const { taskId } = params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
  }
}
