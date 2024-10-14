

import { useSession } from "next-auth/react"; // Import useSession hook
import AuthHomeView from "@/sections/AuthHomeView"; // Import authorized view
import NonAuthHomeView from "@/sections/NonAuthHomeView"; // Import unauthorized view

export const metadata = { title: "Domov | ZoskaSnap" };

export default function Home() {
  const { data: session } = useSession(); // Get the session data

  if (session) {
    // If the user is authenticated, render the AuthHomeView
    return <AuthHomeView />;
  } else {
    // If the user is not authenticated, render the NonAuthHomeView
    return <NonAuthHomeView />;
  }
}
