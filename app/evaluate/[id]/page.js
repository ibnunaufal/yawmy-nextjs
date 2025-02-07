"use client";
import { useRouter } from "next/navigation";

export default function EvaluatePage({ params }) {
  const { id } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Evaluate Item {id}</h1>
      <p>Provide your feedback for this item.</p>
    </div>
  );
}
