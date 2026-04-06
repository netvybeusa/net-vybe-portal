"use client";

import SongCard from "./SongCard";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PleaseSignIn from "@/components/PleaseSignIn";

import Sidebar from "@/components/Sidebar";
import QuickMenu from "@/components/QuickMenu";

import { db } from "@/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function MusicLibraryPage() {
  const { user, loading } = useAuth();

  const [tracks, setTracks] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  // Fetch user tracks
  useEffect(() => {
    const fetchTracks = async () => {
      if (!user?.uid) return;

      try {
        const q = query(
          collection(db, "submissions"),
          where("uid", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTracks(docs);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchTracks();
  }, [user]);

  // Loading state
  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f1a] text-purple-300 text-lg">
        Loading your music library...
      </div>
    );
  }

  // Protect route
  if (!user) {
    return <PleaseSignIn />;
  }

  return (
    <div className="flex min-h-screen bg-[#0f0f1a] text-white">

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-56 px-6 py-10 space-y-10">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-purple-300">
          Your Music Library
        </h1>
        <p className="text-purple-200">
          Browse your uploaded tracks, artwork, and metadata.
        </p>

        {/* TRACK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">

          {tracks.length === 0 && (
            <div className="text-gray-400 text-lg">
              No tracks uploaded yet.
            </div>
          )}

          {tracks.map((track) => (
            <SongCard key={track.id} song={track} />
          ))}
        </div>
      </main>

      {/* FLOATING QUICK MENU */}
      <QuickMenu />
    </div>
  );
}
