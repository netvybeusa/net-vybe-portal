"use client";

import { SignupFormData } from "@/types/SignupForm";

type StepTrackInfoProps = {
  formData: SignupFormData;
  setFormData: (data: Partial<SignupFormData>) => void;
};

export default function StepTrackInfo({ formData, setFormData }: StepTrackInfoProps) {
  return (
    <div className="w-full flex justify-center px-4 py-10 bg-[var(--nv-bg)]">

      {/* Glowing Card */}
      <div
        className="
          w-full max-w-md
          bg-black/40
          border border-purple-700/40
          shadow-[0_0_25px_rgba(139,92,246,0.35)]
          drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]
          rounded-2xl p-6
          flex flex-col gap-5
        "
      >
        <h2 className="text-xl font-semibold text-purple-300 text-center drop-shadow-[0_0_10px_rgba(168,85,247,0.45)]">
          Artist Track Details
        </h2>

        {/* Track Title */}
        <div>
          <label className="block text-purple-300 mb-1">Track Title</label>
          <input
            type="text"
            placeholder="Track Title"
            value={formData.trackTitle}
            onChange={(e) => setFormData({ trackTitle: e.target.value })}
            className="
              w-full bg-black/30 text-purple-300
              border border-purple-700/40 rounded-lg px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-purple-500
            "
          />
        </div>

        {/* Track File Upload */}
        <div>
          <label className="block text-purple-300 mb-1">Upload Track</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFormData({ trackFile: e.target.files?.[0] || null })}
            className="
              w-full bg-black/30 text-purple-300
              border border-purple-700/40 rounded-lg px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-purple-500
              file:text-purple-300 file:bg-black/40 file:border-none
            "
          />
        </div>

        {/* Track Link */}
        <div>
          <label className="block text-purple-300 mb-1">Track Link (optional)</label>
          <input
            type="text"
            placeholder="Track Link"
            value={formData.trackLink}
            onChange={(e) => setFormData({ trackLink: e.target.value })}
            className="
              w-full bg-black/30 text-purple-300
              border border-purple-700/40 rounded-lg px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-purple-500
            "
          />
        </div>
      </div>
    </div>
  );
}