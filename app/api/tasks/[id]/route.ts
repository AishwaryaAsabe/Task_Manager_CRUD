import { NextRequest, NextResponse } from "next/server";
import Task from "../../../models/Task"; // Ensure correct path
import connectToDatabase from "@/config/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();

  // Await the `params` object
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ message: "Error updating task" }, { status: 500 });
  }
}









// export async function PUT(req: Request, context: { params: { id?: string } }) {
//   await connectToDatabase();

//   try {
//     const id = context?.params?.id; // Ensure params is accessed correctly
//     if (!id) {
//       return NextResponse.json({ error: 'Missing task ID' }, { status: 400 });
//     }

//     const body = await req.json();
//     const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });

//     if (!updatedTask) {
//       return NextResponse.json({ error: 'Task not found' }, { status: 404 });
//     }

//     return NextResponse.json(updatedTask);
//   } catch (error) {
//     console.error('❌ Error updating task:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }









export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();

  // Await the `params` object
  const { id } = await params;

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