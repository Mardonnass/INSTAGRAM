import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthProvider from "../components/AuthProvider";
import ThemeProviderWrapper from "../components/ThemeProvider"; // Import your ThemeProviderWrapper

export const metadata: Metadata = {
  title: "INSTAGTAM",
  description: "Made by PISTAHUDAK",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body style={{ overflow: 'hidden' }}>
        <ThemeProviderWrapper> {/* Wrap the content with ThemeProviderWrapper */}
          <AuthProvider>
            <div style={{ 
              height: '100vh', 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden' 
            }}>
              <main style={{ 
                flexGrow: 1, 
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch'
              }}>
                {children}
              </main>
              <Navbar />
            </div>
          </AuthProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
