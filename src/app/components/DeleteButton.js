"use client";
import { useRouter } from "next/navigation";

export default function DeleteButton({ carId }) {
  const router = useRouter();

  const handleDelete = async () => {
    // Show confirmation dialog before deleting
    if (confirm("Do you want to delete this listing?")) {
      const res = await fetch(`/api/cars/${carId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Refresh the current route to update the UI
        router.refresh(); 
      } else {
        alert("Error deleting the car");
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="text-red-500 hover:text-red-400 text-[10px] font-bold uppercase transition-colors"
    >
      Delete
    </button>
  );
}