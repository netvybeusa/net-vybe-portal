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

    if (
      audioFile.type !== "audio/mpeg" &&
      !audioFile.name.toLowerCase().endsWith(".mp3")
    ) {
      alert("Please upload an MP3 file only.");
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
      if (artworkFile) {
        const artPath = `artwork/${user.uid}/${Date.now()}_${artworkFile.name}`;
        const artRef = ref(storage, artPath);
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
    <div className="flex min-h-screen bg-[#0f0f1a] text-white">
      <Sidebar />

      <main className="flex-1 ml-56 px-6 py-10 space-y-10">
        <h1 className="text-4xl font-bold text-purple-300">
          Upload New Track
        </h1>

        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setArtworkFile(e.target.files?.[0] || null)}
        />

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <input
          placeholder="Mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />

        {uploading && <p>{progress.toFixed(0)}%</p>}

        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Track"}
        </button>
      </main>
    </div>
  );
}