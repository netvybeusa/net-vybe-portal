"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import Image from "next/image";

interface Track {
  id: string;
  title: string;
  coverUrl?: string;
  createdAt?: any;
}

export default function RecentUploads({ userId }: { userId: string }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchTracks = async () => {
      try {
        const q = query(
          collection(db, "tracks"),
          where("userId", "==", userId),
          orderBy("createdAt", "desc"),
          limit(5)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Track[];

        setTracks(data);
      } catch (error) {
        console.error("Error fetching recent uploads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [userId]);

  if (loading) {
    return (
      <div className="border border-purple-700/40 rounded-xl p-6 bg-black/40 text-purple-300">
        Loading your uploads…
      </div>
    );
  }

  return (
    <div className="border border-purple-700/40 rounded-xl p-6 bg-black/40 shadow-[0_0_25px_rgba(139,92,246,0.35)]">
      <h2 className="text-xl font-semibold text-purple-200 mb-4">
        Your Recent Uploads
      </h2>

      {tracks.length === 0 ? (
        <p className="text-gray-400">You haven’t uploaded anything yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-black/30 border border-purple-700/20 hover:bg-black/50 transition"
            >
              {/* Cover Art */}
              <div className="w-14 h-14 rounded-md overflow-hidden bg-purple-900/30 border border-purple-700/40">
                {track.coverUrl ? (
                  <Image
                    src={track.coverUrl}
                    alt={track.title}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-purple-300 text-xs">
                    No Cover
                  </div>
                )}
              </div>

              {/* Track Info */}
              <div className="flex flex-col">
                <span className="text-white font-medium">{track.title}</span>
                <span className="text-gray-400 text-sm">
                  {track.createdAt?.toDate
                    ? track.createdAt.toDate().toLocaleDateString()
                    : "Unknown date"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
