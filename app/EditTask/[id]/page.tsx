"use client";
import { useEffect } from "react";
import EditTask from "@/app/components/EditTask";
import { useParams } from "next/navigation";

const EditTaskPage = () => {
    const params = useParams();
    const taskId = params?.id as string;

    useEffect(() => {
        console.log("🔹 Params:", params);
    }, [params]);

    if (!taskId) {
        return <p>Loading...</p>; // Allow time for params to populate
    }

    return <EditTask taskId={taskId} />;
};

export default EditTaskPage;
