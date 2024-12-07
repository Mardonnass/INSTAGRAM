"use client";

import SessionWatchdog from "@/components/SessionWatchdog";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionWatchdog>
      <div>{children}</div>
    </SessionWatchdog>
  );
}
