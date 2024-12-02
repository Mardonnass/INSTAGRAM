import SessionWatchdog from "../../components/SessionWatchdog";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionWatchdog>
          {children} {/* Your app's main content */}
        </SessionWatchdog>
      </body>
    </html>
  );
}
