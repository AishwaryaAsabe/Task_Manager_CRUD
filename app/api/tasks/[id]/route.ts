// import { NextResponse } from 'next/server';
// import Task from '../../../models/Task';
// import connectToDatabase from '@/config/db';

// // Update a task

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   await connectToDatabase();

//   const id = params?.id; // Correctly extracting the ID

//   if (!id) {
//     return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
//   }

//   try {
//     const body = await req.json(); // Ensure request body is parsed
//     const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });

//     if (!updatedTask) {
//       return NextResponse.json({ message: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json(updatedTask);
//   } catch (error) {
//     console.error("Error updating task:", error);
//     return NextResponse.json({ message: "Error updating task" }, { status: 500 });
//   }
// }



// export async function DELETE(req: Request, context: { params: { id: string } }) {
//   await connectToDatabase();

//   const { id } = await context.params; 

//   if (!id) {
//     return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
//   }

//   try {
//     await Task.findByIdAndDelete(id);
//     return NextResponse.json({ message: "Task deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting task:", error);
//     return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import Task from "../../../models/Task";
import connectToDatabase from "@/config/db";

// ✅ Update a task (Fix for Next.js 15+)
export async function PUT(req: Request, context: { params: { id: string } }) {
  await connectToDatabase();

  const { id } = context.params; // ✅ Corrected way to access params

  if (!id) {
    return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json(); // ✅ Ensure request body is parsed
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

// ✅ Delete a task (Fix for Next.js 15+)
export async function DELETE(req: Request, context: { params: { id: string } }) {
  await connectToDatabase();

  const { id } = context.params; // ✅ Correct way to extract id

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
