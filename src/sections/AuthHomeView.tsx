"use client"; // Ensure this is a Client Component

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthHomeView() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/prispevok"); // Redirect if session exists
    }
  }, [session, router]);

  return <div>Redirecting...</div>; 
}
