"use client";

import { useState } from "react";
import { db, storage } from "@/firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteTrackButton({
  trackId,
  storagePath,
}: {
  trackId: string;
  storagePath: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);

    try {
      // Delete Firestore document
      await deleteDoc(doc(db, "tracks", trackId));

      // Delete file from Firebase Storage
      if (storagePath) {
        const fileRef = ref(storage, storagePath);
        await deleteObject(fileRef);
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting track:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trash Icon */}
      <button
        onClick={() => setOpen(true)}
        className="text-red-400 hover:text-red-500 transition drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]"
      >
        <Trash2 size={20} />
      </button>

      {/* Confirmation Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a2e] p-6 rounded-2xl border border-purple-700/40 shadow-[0_0_30px_rgba(139,92,246,0.5)] w-80">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">
              Delete Track?
            </h2>
            <p className="text-gray-300 mb-6">
              This action cannot be undone. Your track will be permanently removed.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition shadow-[0_0_20px_rgba(239,68,68,0.6)]"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
