"use client";
import UpdateJobPage from "../_components/UpdateJobPage"

export default function UpdateJob({ params }: { params: { id: string } }) {
  console.log("Job ID:", params.id);

  if (!params.id) {
    return <p>Loading...</p>;
  }

  return <UpdateJobPage jobId={parseInt(params.id, 10)} />;
}