"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PleaseSignIn from "@/components/PleaseSignIn";
import Sidebar from "@/components/Sidebar";

import { db, storage } from "@/firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function UploadMusicPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [mood, setMood] = useState("");

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  if (!loading && !user) {
    return <PleaseSignIn />;
  }

  const handleUpload = async () => {
    if (!user) {
      alert("You must be signed in.");
      return;
    }

    if (!audioFile) {
      alert("Please select an audio file.");
      return;
    }

  const fileType = audioFile.type;
const fileName = audioFile.name.toLowerCase();

if (
  !fileType.includes("audio/mpeg") &&   // mp3
  !fileType.includes("audio/mp4") &&    // mp4 audio
  !fileType.includes("video/mp4") &&    // mp4 video
  !fileType.includes("audio/wav") &&    // wav (some browsers)
  !fileType.includes("audio/x-wav") &&  // wav fallback
  !fileName.endsWith(".mp3") &&
  !fileName.endsWith(".mp4") &&
  !fileName.endsWith(".wav")
) {
  alert("Please upload MP3, MP4, or WAV files only.");
  return;
}

    if (!title.trim()) {
      alert("Please enter a track title.");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const fileName = `${Date.now()}_${audioFile.name}`;
      const audioPath = `tracks/${user.uid}/${fileName}`;
      const audioRef = ref(storage, audioPath);

      const snapshot = await uploadBytesResumable(audioRef, audioFile);
      const audioURL = await getDownloadURL(snapshot.ref);

      let artworkURL = "";
let artworkPath = "";

if (artworkFile) {
  artworkPath = `artwork/${user.uid}/${Date.now()}_${artworkFile.name}`;
  const artRef = ref(storage, artworkPath);
  const artSnapshot = await uploadBytesResumable(artRef, artworkFile);
  artworkURL = await getDownloadURL(artSnapshot.ref);
}

      await addDoc(collection(db, "submissions"), {
  uid: user.uid,
  title: title.trim(),
  genre: genre.trim(),
  mood: mood.trim(),
  url: audioURL,
  artworkUrl: artworkURL,
  artworkPath, // ✅ NEW
  storagePath: audioPath,
  createdAt: serverTimestamp(),
  createdAtLocal: new Date(),
});

      setProgress(100);

      setAudioFile(null);
      setArtworkFile(null);
      setTitle("");
      setGenre("");
      setMood("");

      router.push("/music");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0b0b14] text-white">
      <Sidebar />

      <main className="flex-1 ml-56 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-300">
              Upload New Track
            </h1>
            <p className="mt-3 text-purple-200/80 text-base md:text-lg">
              Add your song, cover art, and metadata to your Net Vybe library.
            </p>
          </div>

          <div className="rounded-3xl border border-purple-500/20 bg-[#11121A]/95 shadow-[0_0_40px_rgba(139,92,246,0.15)] p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Audio File (MP3 / MP4 / WAV)
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  className="block w-full rounded-xl border border-white/10 bg-[#0f0f1a] px-4 py-3 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-purple-600 file:px-4 file:py-2 file:text-white hover:file:bg-purple-700"
                />
                {audioFile && (
                  <p className="mt-2 text-xs text-purple-300/80">
                    Selected: {audioFile.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Artwork (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setArtworkFile(e.target.files?.[0] || null)}
                  className="block w-full rounded-xl border border-white/10 bg-[#0f0f1a] px-4 py-3 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-pink-600 file:px-4 file:py-2 file:text-white hover:file:bg-pink-700"
                />
                {artworkFile && (
                  <p className="mt-2 text-xs text-pink-300/80">
                    Selected: {artworkFile.name}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Track Title
                </label>
                <input
                  type="text"
                  placeholder="Enter track title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0f0f1a] px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Genre
                </label>
                <input
                  type="text"
                  placeholder="Genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0f0f1a] px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Mood
                </label>
                <input
                  type="text"
                  placeholder="Mood"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0f0f1a] px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-purple-200">
                  <span>Uploading...</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] transition hover:scale-[1.02] hover:from-purple-500 hover:to-pink-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading ? "Uploading..." : "Upload Track"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}