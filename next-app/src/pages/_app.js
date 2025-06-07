import "@/styles/globals.css";
import { createClient } from "@/utils/supabase/client";
import { HeroUIProvider } from "@heroui/react";
import { useEffect } from "react";

const supabase = createClient();

export default function App({ Component, pageProps }) {

  useEffect(() => {
    const signInAnonymously = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Current user:", user);
      if (!user) {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) {
          console.error("Anonymous sign-in error:", error);
        } else {
          console.log("Signed in anonymously:", data.user);
        }
      }
    };

    signInAnonymously();
  }, []);

  return (
    <HeroUIProvider>
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}
