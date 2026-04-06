"use client";

import { SignupFormData } from "@/types/SignupForm";

type StepConsentProps = {
  formData: SignupFormData;
  setFormData: (data: Partial<SignupFormData>) => void;
};

export default function StepConsent({ formData, setFormData }: StepConsentProps) {
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
          flex flex-col gap-6
        "
      >
        <h2 className="text-xl font-semibold text-purple-300 text-center drop-shadow-[0_0_10px_rgba(168,85,247,0.45)]">
          Consent & Agreements
        </h2>

        {/* Consent Items */}
        <div className="flex flex-col gap-4">

          {/* Rights Ownership */}
          <label className="flex items-start gap-3 text-purple-300">
            <input
              type="checkbox"
              checked={formData.ownsRights || false}
              onChange={(e) => setFormData({ ownsRights: e.target.checked })}
              className="
                h-5 w-5 rounded bg-black/40
                border border-purple-700/40
                text-purple-500
                focus:ring-purple-500
              "
            />
            <span>I confirm I own the rights to this music.</span>
          </label>

          {/* Terms Agreement */}
          <label className="flex items-start gap-3 text-purple-300">
            <input
              type="checkbox"
              checked={formData.acceptsTerms || false}
              onChange={(e) => setFormData({ acceptsTerms: e.target.checked })}
              className="
                h-5 w-5 rounded bg-black/40
                border border-purple-700/40
                text-purple-500
                focus:ring-purple-500
              "
            />
            <span>I agree to Net Vybe’s terms and conditions.</span>
          </label>

          {/* Review Notice */}
          <label className="flex items-start gap-3 text-purple-300">
            <input
              type="checkbox"
              checked={formData.reviewConsent || false}
              onChange={(e) => setFormData({ reviewConsent: e.target.checked })}
              className="
                h-5 w-5 rounded bg-black/40
                border border-purple-700/40
                text-purple-500
                focus:ring-purple-500
              "
            />
            <span>I understand my content may be reviewed for quality and safety.</span>
          </label>

        </div>
      </div>
    </div>
  );
}