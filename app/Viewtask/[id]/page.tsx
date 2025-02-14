"use client"; 

import ViewTask from "../../components/ViewTask";
import { useParams } from "next/navigation";

const ViewTaskPage = () => {
  const { id } = useParams(); 

  if (!id) return <p>Loading...</p>; 

  return <ViewTask taskId={id as string} />; 
};

export default ViewTaskPage;
