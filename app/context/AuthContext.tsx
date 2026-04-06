"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { app } from "@/firebase/firebaseConfig";

interface AuthContextType {
  user: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: any;

    async function init() {
      const { getAuth, onAuthStateChanged } = await import("firebase/auth");
      const auth = getAuth(app);

      unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      });
    }

    init();

    return () => unsubscribe && unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { getAuth, signInWithEmailAndPassword } = await import("firebase/auth");
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    const { getAuth, createUserWithEmailAndPassword } = await import("firebase/auth");
    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    const { getAuth } = await import("firebase/auth");
    const auth = getAuth(app);
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
