"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PleaseSignIn from "@/components/PleaseSignIn";

import Sidebar from "@/components/Sidebar";
import QuickMenu from "@/components/QuickMenu";

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

  // Protect route
  if (!loading && !user) {
    return <PleaseSignIn />;
  }

  const handleUpload = async () => {
    if (!audioFile) {
      alert("Please select an audio file.");
      return;
    }

    if (!title) {
      alert("Please enter a track title.");
      return;
    }

    setUploading(true);

    try {
      // 🎵 Upload audio
      const audioRef = ref(storage, `tracks/${user.uid}/${audioFile.name}`);
      const audioTask = uploadBytesResumable(audioRef, audioFile);

      audioTask.on("state_changed", (snapshot) => {
        const pct =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(pct);
      });

      await audioTask;
      const audioURL = await getDownloadURL(audioRef);

      // 🎨 Upload artwork (optional)
      let artworkURL = "";
      if (artworkFile) {
        const artRef = ref(
          storage,
          `artwork/${user.uid}/${artworkFile.name}`
        );
        await uploadBytesResumable(artRef, artworkFile);
        artworkURL = await getDownloadURL(artRef);
      }

      // 💾 Save to Firestore (FIXED)
      await addDoc(collection(db, "submissions"), {
        uid: user.uid,
        title,
        genre,
        mood,

        // ✅ CRITICAL FIX
        audioURL: audioURL,

        artworkUrl: artworkURL,
        storagePath: `tracks/${user.uid}/${audioFile.name}`,

        // ✅ timestamps
        createdAt: serverTimestamp(),
        createdAtLocal: new Date(),
      });

      // Reset form
      setAudioFile(null);
      setArtworkFile(null);
      setTitle("");
      setGenre("");
      setMood("");
      setProgress(0);

      // Redirect
      router.push("/music");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f1a] text-white">
      <Sidebar />

      <main className="flex-1 ml-56 px-6 py-10 space-y-10">
        <h1 className="text-4xl font-bold text-purple-300">
          Upload New Track
        </h1>

        {/* AUDIO */}
        <input
          type="file"
          accept="audio/*"
          onChange={(e) =>
            setAudioFile(e.target.files?.[0] || null)
          }
        />

        {/* ARTWORK */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setArtworkFile(e.target.files?.[0] || null)
          }
        />

        {/* META */}
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

        {/* PROGRESS */}
        {uploading && <p>{progress.toFixed(0)}%</p>}

        {/* BUTTON */}
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Track"}
        </button>
      </main>

      <QuickMenu />
    </div>
  );
}