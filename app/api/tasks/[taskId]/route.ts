import { NextRequest, NextResponse } from "next/server";
import Task from "@/app/models/Task";
import connectToDatabase from "@/config/db";

// Fix: Use async for params
export async function GET(req: NextRequest, context: { params: Promise<{ taskId: string }> }) {
  await connectToDatabase();

  const { taskId } = await context.params; // ✅ Await params since it's a Promise

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

export async function PUT(req: NextRequest, context: { params: Promise<{ taskId: string }> }) {
  await connectToDatabase();

  const { taskId } = await context.params; // ✅ Await params since it's a Promise

  if (!taskId) {
    return NextResponse.json({ message: "Task ID is missing" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(taskId, body, { new: true });

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ message: "Error updating task" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ taskId: string }> }) {
  await connectToDatabase();

  const { taskId } = await context.params; // ✅ Await params since it's a Promise

  if (!taskId) {
    return NextResponse.json({ message: "Task ID is missing" }, { status: 400 });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
  }
}
