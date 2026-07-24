import type { Metadata } from "next";
import { Playfair_Display, Poppins, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { createClient } from "@/utils/supabase/server";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Mrudhuchithraa | Handcrafted Art & Custom Gifts",
  description: "A luxury handcrafted digital gallery where every collection tells a story.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${poppins.variable} ${dmSans.variable} font-body antialiased bg-background text-foreground`}
      >
        <SmoothScroll>
          <CustomCursor />
          <Navbar user={user} />
          {children}
          <BottomNav />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
