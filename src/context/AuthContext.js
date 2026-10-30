import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) console.error("Unable to restore session:", error.message);
      setSession(data?.session ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  const signIn = useCallback((email, password) =>
    supabase.auth.signInWithPassword({ email, password }), []);
  const signUp = useCallback((email, password) =>
    supabase.auth.signUp({ email, password }), []);
  const signInWithGoogle = useCallback(() =>
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" },
    }), []);
  const signOut = useCallback(() => supabase.auth.signOut(), []);

  return (
    <AuthContext.Provider value={{
      session, user: session?.user ?? null, loading,
      signIn, signUp, signInWithGoogle, signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
