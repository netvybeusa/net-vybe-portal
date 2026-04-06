"use client";

import React, { useState } from "react";
import { SignupFormData } from "@/types/SignupForm";
import { Eye, EyeOff } from "lucide-react";

export const requiredFields = ["artistName", "email", "password"];

interface Props {
  formData: SignupFormData;
  setFormData: (data: any) => void;
  errors: string[];
}

export default function StepArtistInfo({ formData, setFormData, errors }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex justify-center px-4 py-10 bg-[var(--nv-bg)]">

      {/* Glowing Card */}
      <div
        className="
          bg-black/40
          border border-purple-700/40
          shadow-[0_0_25px_rgba(139,92,246,0.35)]
          drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]
          rounded-2xl p-6 w-full max-w-xl
        "
      >
        {/* Title */}
        <h3 className="text-xl font-semibold text-purple-300 mb-6 text-center drop-shadow-[0_0_10px_rgba(168,85,247,0.45)]">
          Artist Information
        </h3>

        {/* Form Fields */}
        <div className="space-y-5">

          {/* Artist Name */}
          <div>
            <label className="block text-purple-300 mb-1">Artist Name *</label>
            <input
              type="text"
              value={formData.artistName}
              onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
              className={`
                w-full max-w-md mx-auto block
                bg-black/40 border rounded-lg px-4 py-2 text-purple-300
                focus:outline-none focus:ring-2 focus:ring-purple-500
                ${errors.includes("artistName") ? "border-red-500" : "border-purple-700/40"}
              `}
            />
          </div>

          {/* Stage Name */}
          <div>
            <label className="block text-purple-300 mb-1">Stage Name</label>
            <input
              type="text"
              value={formData.stageName}
              onChange={(e) => setFormData({ ...formData, stageName: e.target.value })}
              className="
                w-full max-w-md mx-auto block
                bg-black/40 border border-purple-700/40 rounded-lg px-4 py-2 text-purple-300
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-purple-300 mb-1">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`
                w-full max-w-md mx-auto block
                bg-black/40 border rounded-lg px-4 py-2 text-purple-300
                focus:outline-none focus:ring-2 focus:ring-purple-500
                ${errors.includes("email") ? "border-red-500" : "border-purple-700/40"}
              `}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-purple-300 mb-1">Password *</label>

            <div className="relative w-full max-w-md mx-auto">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password || ""}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a password"
                className={`
                  w-full bg-black/40 border rounded-lg px-4 py-2 text-purple-300
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  ${errors.includes("password") ? "border-red-500" : "border-purple-700/40"}
                `}
              />

              {/* Neon Eye Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-purple-300 transition-all duration-300
                  hover:scale-110
                  drop-shadow-[0_0_6px_rgba(168,85,247,0.9)]
                  hover:drop-shadow-[0_0_12px_rgba(168,85,247,1)]
                "
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-purple-300 mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="
                w-full max-w-md mx-auto block
                bg-black/40 border border-purple-700/40 rounded-lg px-4 py-2 text-purple-300
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

        </div>
      </div>
    </div>
  );
}