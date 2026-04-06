"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import QuickMenu from "@/components/QuickMenu";
import PleaseSignIn from "@/components/PleaseSignIn";

import { db, storage } from "@/firebase/firebaseConfig";

// Firestore
import { doc, getDoc, setDoc } from "firebase/firestore";

// Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [artistName, setArtistName] = useState("");
  const [bio, setBio] = useState("");
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");

  const [instagram, setInstagram] = useState("");
  const [tiktok, setTikTok] = useState("");
  const [youtube, setYouTube] = useState("");
  const [website, setWebsite] = useState("");
  const [soundcloud, setSoundcloud] = useState("");
  const [spotify, setSpotify] = useState("");

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [bannerUrl, setBannerUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [saving, setSaving] = useState(false);

  // Protect route
  if (!loading && !user) {
    return <PleaseSignIn />;
  }

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;

      const docRef = doc(db, "profiles", user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();

        setArtistName(data.artistName || "");
        setBio(data.bio || "");
        setGenre(data.genre || "");
        setLocation(data.location || "");

        setInstagram(data.instagram || "");
        setTikTok(data.tiktok || "");
        setYouTube(data.youtube || "");
        setWebsite(data.website || "");
        setSoundcloud(data.soundcloud || "");
        setSpotify(data.spotify || "");

        setBannerUrl(data.bannerUrl || "");
        setAvatarUrl(data.avatarUrl || "");
      }
    };

    fetchProfile();
  }, [user]);

  const uploadImage = async (file: File, path: string) => {
    const storageRef = ref(storage, `${path}/${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSave = async () => {
    if (!user?.uid) return;

    setSaving(true);

    try {
      let newBannerUrl = bannerUrl;
      let newAvatarUrl = avatarUrl;

      if (bannerFile) {
        newBannerUrl = await uploadImage(bannerFile, "banners");
      }

      if (avatarFile) {
        newAvatarUrl = await uploadImage(avatarFile, "avatars");
      }

     const docRef = doc(db, "profiles", user.uid);

await setDoc(
  docRef,
  {
    artistName,
    bio,
    genre,
    location,
    instagram,
    tiktok,
    youtube,
    website,
    soundcloud,
    spotify,
    bannerUrl: newBannerUrl,
    avatarUrl: newAvatarUrl,
  },
  { merge: true }
);

      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f1a] text-white">

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-56 px-6 py-10 space-y-10">

        {/* HERO HEADER */}
        <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-purple-900">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_purple-500,_transparent)]" />

          <h1 className="text-5xl font-bold text-purple-300 relative z-10">
            Edit Your Artist Profile
          </h1>

          <p className="text-purple-200 mt-3 text-lg max-w-xl relative z-10">
            Customize your identity, visuals, and social presence.
          </p>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT COLUMN — VISUALS */}
          <div className="space-y-10">

            {/* BANNER */}
            <div className="p-6 rounded-2xl bg-black/40 border border-purple-700/40 shadow-[0_0_25px_rgba(139,92,246,0.25)]">
              <h2 className="text-xl font-semibold text-purple-300 mb-4">
                Banner Image
              </h2>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                className="w-full p-3 rounded-lg bg-black/60 border border-purple-700/40"
              />

              {(bannerFile || bannerUrl) && (
                <img
                  src={
                    bannerFile
                      ? URL.createObjectURL(bannerFile)
                      : bannerUrl
                  }
                  className="w-full h-40 object-cover rounded-xl mt-4 shadow-[0_0_25px_rgba(139,92,246,0.4)]"
                />
              )}
            </div>

            {/* AVATAR */}
            <div className="p-6 rounded-2xl bg-black/40 border border-purple-700/40 shadow-[0_0_25px_rgba(139,92,246,0.25)]">
              <h2 className="text-xl font-semibold text-purple-300 mb-4">
                Profile Picture
              </h2>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                className="w-full p-3 rounded-lg bg-black/60 border border-purple-700/40"
              />

              {(avatarFile || avatarUrl) && (
                <img
                  src={
                    avatarFile
                      ? URL.createObjectURL(avatarFile)
                      : avatarUrl
                  }
                  className="w-40 h-40 object-cover rounded-full mt-4 shadow-[0_0_25px_rgba(168,85,247,0.6)] border-4 border-purple-600"
                />
              )}
            </div>
          </div>

          {/* RIGHT COLUMN — DETAILS */}
          <div className="space-y-10">

            {/* BASIC INFO */}
            <div className="p-6 rounded-2xl bg-black/40 border border-purple-700/40 shadow-[0_0_25px_rgba(139,92,246,0.25)] space-y-4">
              <h2 className="text-xl font-semibold text-purple-300 mb-4">
                Artist Details
              </h2>

              <input
                type="text"
                placeholder="Artist Name"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/40 border border-purple-700/40"
              />

              <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/40 border border-purple-700/40 h-32"
              />

              <input
                type="text"
                placeholder="Primary Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/40 border border-purple-700/40"
              />

              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/40 border border-purple-700/40"
              />
            </div>

            {/* SOCIAL LINKS */}
            <div className="p-6 rounded-2xl bg-black/40 border border-purple-700/40 shadow-[0_0_25px_rgba(139,92,246,0.25)] space-y-4">
              <h2 className="text-xl font-semibold text-purple-300 mb-4">
                Social Links
              </h2>

              <input
                type="text"
                placeholder="Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/40 border border-purple-700/40"
              />

              <input
                type="text"
                placeholder="TikTok"
                value={tiktok}
                onChange={(e) => setTikTok(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/40 border border-purple-700/40"
              />

              <input
                type="text"
                placeholder="YouTube"
                value={youtube}
                onChange={(e) => setYouTube(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/40 border border-purple-700/40"
              />

              <input
                type="text"
                placeholder="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/40 border border-purple-700/40"
              />

              <input
                type="text"
                placeholder="SoundCloud"
                value={soundcloud}
                onChange={(e) => setSoundcloud(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/40 border border-purple-700/40"
              />

              <input
                type="text"
                placeholder="Spotify"
                value={spotify}
                onChange={(e) => setSpotify(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/40 border border-purple-700/40"
              />
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition shadow-[0_0_25px_rgba(168,85,247,0.45)] text-white font-semibold text-lg"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </main>

      {/* FLOATING QUICK MENU */}
      <QuickMenu />
    </div>
  );
}
