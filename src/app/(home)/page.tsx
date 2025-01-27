// src/app/(home)/page.tsx

"use client"; // Ensure this is a Client Component

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NonAuthHomeView from "../../sections/NonAuthHomeView";

export default function HomePage() {
  const { data: session } = useSession();  // Get session state from NextAuth
  const router = useRouter();  // Access router for navigation

  useEffect(() => {
    if (session) {
      // If session exists, redirect to posts page
      router.push("/prispevok");
    }
  }, [session, router]);

  // If no session, show non-authenticated view
  if (!session) {
    return <NonAuthHomeView />;
  }

  return null;  // In case session exists but hasn't yet redirected
}
