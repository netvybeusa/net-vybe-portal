export interface SignupFormData {
  artistName: string;
  email: string;
  password: string;

  stageName?: string;
  phone?: string;
  bio?: string;
  socialHandle?: string;
  notes?: string;

  trackTitle?: string;
  trackFile?: File | null;
  trackLink?: string;

  // NEW: Track genre
  genre?: string;

  // Consent fields
  ownsRights?: boolean;
  acceptsTerms?: boolean;
  reviewConsent?: boolean;
}