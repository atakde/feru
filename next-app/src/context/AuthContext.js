import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      }
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signInAnonymously = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.error("Anonymous sign-in error:", error);
        return { error };
      }
      return { data };
    }
    return { data: { user } };
  };

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const getToken = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, getToken, signInAnonymously }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};