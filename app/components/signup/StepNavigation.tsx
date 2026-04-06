"use client";

type StepNavigationProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isNextDisabled?: boolean;
};

export default function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isNextDisabled = false,
}: StepNavigationProps) {
  return (
    <div className="w-full flex justify-center px-4 py-6">

      {/* Glowing Card */}
      <div
        className="
          w-full max-w-md
          bg-black/40
          border border-purple-700/40
          shadow-[0_0_25px_rgba(139,92,246,0.35)]
          drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]
          rounded-2xl p-4
          flex items-center justify-between
        "
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          disabled={currentStep === 1}
          className={`
            text-purple-300 px-4 py-2 rounded-lg
            transition
            ${currentStep === 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:text-purple-200 hover:underline"
            }
          `}
        >
          Back
        </button>

        {/* Step Indicator */}
        <span className="text-purple-300 text-sm tracking-wide">
          Step {currentStep} of {totalSteps}
        </span>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`
            px-5 py-2 rounded-lg text-white font-medium
            bg-purple-700 hover:bg-purple-600
            shadow-[0_0_15px_rgba(139,92,246,0.35)]
            transition
            ${isNextDisabled ? "opacity-40 cursor-not-allowed" : ""}
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
}