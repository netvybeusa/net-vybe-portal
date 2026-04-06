"use client";

import { SignupFormData } from "@/types/SignupForm";

type StepProfileProps = {
  formData: SignupFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
};

export default function StepProfile({ formData, setFormData }: StepProfileProps) {
  return (
    <div className="w-full flex justify-center px-4 py-10">

      {/* Glowing Card */}
      <div
        className="
          w-full max-w-md 
          bg-black/40 
          rounded-xl p-6 
          border border-purple-700/40
          shadow-[0_0_25px_rgba(139,92,246,0.35)]
          drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]
          flex flex-col gap-4
        "
      >
        <h2 className="text-xl font-semibold text-purple-300 text-center drop-shadow-[0_0_10px_rgba(168,85,247,0.45)]">
          Artist Profile
        </h2>

        {/* Bio */}
        <textarea
          placeholder="Artist Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="
            p-3 rounded 
            bg-black/40 
            text-purple-300 
            h-32 resize-none 
            border border-purple-700/40
            focus:outline-none focus:ring-2 focus:ring-purple-500
          "
        />

        {/* Social Handle */}
        <input
          type="text"
          placeholder="Instagram / TikTok Handle"
          value={formData.socialHandle}
          onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
          className="
            p-3 rounded 
            bg-black/40 
            text-purple-300 
            border border-purple-700/40
            focus:outline-none focus:ring-2 focus:ring-purple-500
          "
        />

        {/* Notes */}
        <textarea
          placeholder="Additional Notes (optional)"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="
            p-3 rounded 
            bg-black/40 
            text-purple-300 
            h-24 resize-none 
            border border-purple-700/40
            focus:outline-none focus:ring-2 focus:ring-purple-500
          "
        />
      </div>
    </div>
  );
}