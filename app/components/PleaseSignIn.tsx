"use client";

import { useRouter } from "next/navigation";

export default function PleaseSignIn() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a14] text-white p-6">

      {/* GLOWING LOGO */}
      <div className="relative mb-10">
        <img
          src="/netvybegrove.png" //public/netvybegrove.png
          alt="Net Vybe Grove"
          className="w-40 h-40 object-contain drop-shadow-[0_0_25px_rgba(255,0,255,0.45)]"
        />
      </div>

      <h1 className="text-4xl font-bold text-purple-300 tracking-wide text-center">
        Please Sign In
      </h1>

      <p className="text-purple-200 mt-3 text-center max-w-md">
        Access your artist dashboard, upload music, and manage your Vybe.
      </p>

      <button
        onClick={() => router.push("/login")}
        className="mt-8 px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition shadow-[0_0_25px_rgba(168,85,247,0.45)] text-white font-semibold text-lg"
      >
        Go to Login
      </button>

      <p className="text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} Net Vybe Music. Dripping with Vybe.
      </p>
    </div>
  );
}
