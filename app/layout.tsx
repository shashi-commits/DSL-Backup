import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';


const primaryFont = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discover Sri Lanka | Your Ultimate Tourism Guide",
  description: "Explore Sri Lanka's breathtaking destinations with AI-powered personalized recommendations. From pristine beaches to ancient temples, discover the pearl of the Indian Ocean.",
  keywords: "Sri Lanka tourism, travel guide, destinations, beaches, cultural sites, wildlife, AI recommendations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={primaryFont.className} suppressHydrationWarning>
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}

