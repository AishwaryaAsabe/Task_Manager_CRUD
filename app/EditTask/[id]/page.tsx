"use client"; 

import EditTask from "../../components/EditTask"; 
import { useParams } from "next/navigation";

const EditTaskPage = () => {
  const { id } = useParams(); 

  if (!id) return <p>Loading...</p>; 

  return <EditTask taskId={id as string} />; 
};

export default EditTaskPage;
