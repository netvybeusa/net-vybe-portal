"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfileStatus() {
  const { user } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [uploadCount, setUploadCount] = useState<number>(0);

  useEffect(() => {
  if (!user?.uid) return;

  const fetchProfile = async () => {
    try {
      const docRef = doc(db, "profiles", user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setProfile(snap.data());
      } else {
        setProfile({});
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchUploads = async () => {
    try {
      const q = query(
        collection(db, "tracks"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);
      setUploadCount(snapshot.size);
    } catch (error) {
      console.error("Error fetching uploads:", error);
    }
  };

  fetchProfile();
  fetchUploads();
}, [user]);

      const avatar = profile?.avatarUrl || "/default-avatar.png";
  const banner = profile?.bannerUrl || "/default-banner.jpg";

  const name =
    profile?.artistName ||
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Artist";

  const completeness = (() => {
    let score = 0;
    if (profile?.artistName) score += 25;
    if (profile?.bio) score += 25;
    if (profile?.avatarUrl) score += 25;
    if (profile?.bannerUrl) score += 25;
    return score;
  })();

  return (
    <div className="rounded-2xl overflow-hidden bg-black/40 border border-purple-700/40 shadow-[0_0_25px_rgba(139,92,246,0.35)]">

      {/* Banner */}
      <div className="relative h-32 w-full">
        <Image
          src={banner}
          alt="Banner"
          fill
          className="object-cover opacity-80"
        />
      </div>

      {/* Avatar + Name */}
      <div className="p-6 flex items-center gap-4 -mt-10 relative z-10">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]">
          <Image
            src={avatar}
            alt="Avatar"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-purple-300">{name}</h2>
          <p className="text-gray-400 text-sm">{uploadCount} uploads</p>
        </div>
      </div>

      {/* Profile Completeness */}
      <div className="px-6 pb-6">
        <p className="text-gray-300 text-sm mb-2">Profile Completeness</p>

        <div className="w-full h-3 bg-purple-900/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)] transition-all"
            style={{ width: `${completeness}%` }}
          />
        </div>

        <p className="text-purple-300 text-sm mt-2">{completeness}% complete</p>

        <button
          onClick={() => router.push("/profile")}
          className="mt-4 w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition shadow-[0_0_20px_rgba(139,92,246,0.6)] font-semibold"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
