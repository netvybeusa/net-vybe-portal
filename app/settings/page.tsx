"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PleaseSignIn from "@/components/PleaseSignIn";
import Sidebar from "@/components/Sidebar";

import { updateEmail, updatePassword } from "firebase/auth";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function SettingsPage() {
  const { user, loading } = useAuth();

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notifications, setNotifications] = useState(true);

  const [saving, setSaving] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);

  if (!loading && !user) {
    return <PleaseSignIn />;
  }

  useEffect(() => {
    const loadSettings = async () => {
      if (!user) {
        setLoadingSettings(false);
        return;
      }

      try {
        const profileRef = doc(db, "profiles", user.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          const data = profileSnap.data();
          if (typeof data.notifications === "boolean") {
            setNotifications(data.notifications);
          }
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setLoadingSettings(false);
      }
    };

    loadSettings();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    if (!newEmail.trim() && !newPassword.trim()) {
      // still allow notification-only saves
      setSaving(true);
      try {
        const profileRef = doc(db, "profiles", user.uid);
        console.log("Saving settings for UID:", user.uid);
console.log("Notifications value:", notifications);
       await setDoc(
  doc(db, "profiles", user.uid),
  {
    notifications,
    testField: "settings-write-check",
  },
  { merge: true }
);
       
        alert("Settings updated successfully.");
      } catch (error) {
        console.error("Settings save error:", error);
        alert("Failed to update settings.");
      } finally {
        setSaving(false);
      }
      return;
    }

    if (newPassword && newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setSaving(true);

    try {
      if (newEmail.trim()) {
        await updateEmail(user, newEmail.trim());
      }

      if (newPassword.trim()) {
        await updatePassword(user, newPassword.trim());
      }

      const profileRef = doc(db, "profiles", user.uid);
      await setDoc(
        profileRef,
        {
          notifications,
        },
        { merge: true }
      );

      alert("Settings updated successfully.");
      setNewEmail("");
      setNewPassword("");
    } catch (error: any) {
      console.error("Settings update error:", error);

      if (error?.code === "auth/requires-recent-login") {
        alert(
          "For security, please log out and log back in before updating your email or password."
        );
      } else {
        alert("Failed to update settings.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f1a] text-white">
      <Sidebar />

      <main className="flex-1 ml-56 px-6 py-10 space-y-10">
        <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-purple-900">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_purple-500,_transparent)]" />

          <h1 className="text-5xl font-bold text-purple-300 relative z-10">
            Settings
          </h1>

          <p className="text-purple-200 mt-3 text-lg max-w-xl relative z-10">
            Manage your account, security, and notifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="p-6 rounded-2xl bg-black/40 border border-purple-700/40 shadow-[0_0_25px_rgba(139,92,246,0.25)] space-y-6">
            <h2 className="text-xl font-semibold text-purple-300">
              Account Settings
            </h2>

            <input
              type="email"
              placeholder="New Email Address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full p-4 rounded-xl bg-black/40 border border-purple-700/40"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-4 rounded-xl bg-black/40 border border-purple-700/40"
            />

            <p className="text-gray-400 text-sm">
              Updating your email or password may require you to log in again.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-purple-700/40 shadow-[0_0_25px_rgba(139,92,246,0.25)] space-y-6">
            <h2 className="text-xl font-semibold text-purple-300">
              Notifications
            </h2>

            {loadingSettings ? (
              <p className="text-gray-400 text-sm">Loading preferences...</p>
            ) : (
              <>
                <div
                  className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-purple-700/40 cursor-pointer"
                  onClick={() => setNotifications(!notifications)}
                >
                  <span className="text-purple-200">Email Notifications</span>

                  <div
                    className={`w-12 h-6 rounded-full transition ${
                      notifications ? "bg-purple-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transform transition ${
                        notifications ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>

                <p className="text-gray-400 text-sm">
                  Control whether you receive updates about uploads, analytics,
                  and platform news.
                </p>
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || loadingSettings}
          className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition shadow-[0_0_25px_rgba(168,85,247,0.45)] text-white font-semibold text-lg disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </main>
    </div>
  );
}