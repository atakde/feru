import { AuthProvider, useAuth } from "@/context/AuthContext";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { useEffect } from "react";

function AppContent({ Component, pageProps }) {
  const { signInAnonymously } = useAuth();

  useEffect(() => {
    signInAnonymously();
  }, [signInAnonymously]);

  return <Component {...pageProps} />;
}

export default function App(props) {
  return (
    <HeroUIProvider>
      <AuthProvider>
        <AppContent {...props} />
      </AuthProvider>
    </HeroUIProvider>
  );
}
