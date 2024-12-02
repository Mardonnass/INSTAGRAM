"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const SessionWatchdog = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSessionValid, setIsSessionValid] = useState(true);

  useEffect(() => {
    // Watchdog logic: checks for session status periodically
    const checkSession = () => {
      if (status === "unauthenticated") {
        setIsSessionValid(false);
        signOut(); // Optional: Sign out user if session is invalid
        router.push("/auth/registracia"); // Redirect to login page if no session
      } else {
        setIsSessionValid(true);
      }
    };

    // Check session every 5 seconds
    const interval = setInterval(checkSession, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [status, router]);

  // Show loading state or children based on session validity
  if (status === "loading" || !isSessionValid) {
    return <div>Loading...</div>; // You can show a loading spinner or anything else here
  }

  return <>{children}</>; // Render the children if session is valid
};

export default SessionWatchdog;
