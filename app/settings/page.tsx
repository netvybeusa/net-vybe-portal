"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PleaseSignIn from "@/components/PleaseSignIn";

import Sidebar from "@/components/Sidebar";
import QuickMenu from "@/components/QuickMenu";

import { updateEmail, updatePassword } from "firebase/auth";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notifications, setNotifications] = useState(true);

  const [saving, setSaving] = useState(false);

  // Protect route
  if (!loading && !user) {
    return <PleaseSignIn />;
  }

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);

    try {
      if (newEmail) {
        await updateEmail(user, newEmail);
      }

      if (newPassword) {
        await updatePassword(user, newPassword);
      }

      alert("Settings updated successfully.");
    } catch (error) {
      console.error("Settings update error:", error);
      alert("Failed to update settings.");
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
            Settings
          </h1>

          <p className="text-purple-200 mt-3 text-lg max-w-xl relative z-10">
            Manage your account, security, and notifications.
          </p>
        </div>

        {/* SETTINGS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ACCOUNT SETTINGS */}
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
              Updating your email or password will require re-authentication.
            </p>
          </div>

          {/* NOTIFICATIONS */}
          <div className="p-6 rounded-2xl bg-black/40 border border-purple-700/40 shadow-[0_0_25px_rgba(139,92,246,0.25)] space-y-6">
            <h2 className="text-xl font-semibold text-purple-300">
              Notifications
            </h2>

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
              Control whether you receive updates about uploads, analytics, and platform news.
            </p>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition shadow-[0_0_25px_rgba(168,85,247,0.45)] text-white font-semibold text-lg"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </main>

      {/* FLOATING QUICK MENU */}
      <QuickMenu />
    </div>
  );
}
