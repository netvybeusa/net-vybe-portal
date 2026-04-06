"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignupFormData } from "@/types/SignupForm";

import StepArtistInfo, {
  requiredFields as artistRequired,
} from "@/components/signup/StepArtistInfo";

import StepTrackInfo from "@/components/signup/StepTrackInfo";
import StepProfile from "@/components/signup/StepProfile";
import StepConsent from "@/components/signup/StepConsent";
import StepNavigation from "@/components/signup/StepNavigation";
import SlideWrapper from "@/components/signup/SlideWrapper";

import { app } from "@/firebase/firebaseConfig";

export default function SignupClient() {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState<SignupFormData>({
    artistName: "",
    email: "",
    password: "",
    stageName: "",
    phone: "",
    bio: "",
    socialHandle: "",
    notes: "",
    trackTitle: "",
    trackLink: "",
    genre: "",
    ownsRights: false,
    acceptsTerms: false,
    reviewConsent: false,
  });

  const validationRules = [
    artistRequired,
    [],
    [],
    ["ownsRights", "acceptsTerms", "reviewConsent"],
  ];

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const { getAuth, createUserWithEmailAndPassword } = await import("firebase/auth");
      const { getFirestore, collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const { getStorage, ref, uploadBytes, getDownloadURL } = await import("firebase/storage");

      const auth = getAuth(app);
      const db = getFirestore(app);
      const storage = getStorage(app);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      let trackUrl = "";

      if (formData.trackFile) {
        const storageRef = ref(
          storage,
          `tracks/${formData.artistName}/${formData.trackFile.name}`
        );

        await uploadBytes(storageRef, formData.trackFile);
        trackUrl = await getDownloadURL(storageRef);
      }

      const { trackFile, password, ...safeData } = formData;

      await addDoc(collection(db, "submissions"), {
        uid: user.uid,
        ...safeData,
        trackUrl,
        timestamp: serverTimestamp(),
        status: "Under Review",
      });

      setIsSuccess(true);

      setTimeout(() => {
        router.replace("/login");
      }, 1500);

    } catch (error: any) {
      console.error("❌ SIGNUP ERROR:", error);

      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use.");
      } else if (error.code === "auth/weak-password") {
        alert("Password must be at least 6 characters.");
      } else {
        alert("Signup failed.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    <StepArtistInfo
      formData={formData}
      setFormData={setFormData}
      errors={errors}
    />,
    <StepTrackInfo
      formData={formData}
      setFormData={(data) => setFormData({ ...formData, ...data })}
    />,
    <StepProfile
      formData={formData}
      setFormData={setFormData}
    />,
    <StepConsent
      formData={formData}
      setFormData={(data) => setFormData({ ...formData, ...data })}
    />,
  ];

  return (
    <div className="min-h-screen w-full bg-[var(--nv-bg)] overflow-hidden">
      <div className="w-full text-center py-6">
        <h2 className="text-2xl font-bold text-purple-300">
          Let’s start building your Vybe.
        </h2>
      </div>

      {isSuccess ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
          <h2 className="text-2xl font-bold text-purple-300 mb-4">
            Submission Received
          </h2>
          <p className="text-purple-200 max-w-md">
            Your account has been created and your submission is under review.
          </p>
        </div>
      ) : (
        <>
          <SlideWrapper activeStep={activeStep} steps={steps} />

          <StepNavigation
            currentStep={activeStep + 1}
            totalSteps={steps.length}
            onNext={() => {
              const required = validationRules[activeStep] || [];

              const missing = required.filter(
                (field) => !formData[field as keyof SignupFormData]
              );

              if (missing.length > 0) {
                setErrors(missing);
                return;
              }

              setErrors([]);

              if (activeStep === steps.length - 1) {
                onSubmit();
              } else {
                setActiveStep((prev) => prev + 1);
              }
            }}
            onBack={() => {
              if (activeStep > 0) {
                setActiveStep((prev) => prev - 1);
              }
            }}
            isNextDisabled={isSubmitting}
          />
        </>
      )}
    </div>
  );
}
