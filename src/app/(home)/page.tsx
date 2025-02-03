// src/app/(home)/page.tsx
'use client';

import { useSession } from "next-auth/react";
import NonAuthHomeView from "../../sections/NonAuthHomeView";
import AuthHomeView  from '@/sections/AuthHomeView';

export default function HomePage() {
  const { data: session } = useSession();  // Get session state from NextAuth


  if (session) {
    return <AuthHomeView />;
  }

  // If no session, show non-authenticated view
  if (!session) {
    return <NonAuthHomeView />;
  }

  return null;  // In case session exists but hasn't yet redirected
}