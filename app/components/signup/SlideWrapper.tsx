"use client";

type SlideWrapperProps = {
  activeStep: number;
  steps: React.ReactNode[];
};

export default function SlideWrapper({ activeStep, steps }: SlideWrapperProps) {
  return (
    <div
      className="
        w-full
        flex
        transition-transform
        duration-500
        ease-in-out
      "
      style={{ transform: `translateX(-${activeStep * 100}%)` }}
    >
      {steps.map((step, index) => (
        <div key={index} className="w-full flex-shrink-0">
          {step}
        </div>
      ))}
    </div>
  );
}