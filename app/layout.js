import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Logo from "@/components/Logo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"]
})
export const metadata = {
  title: "Yawmy",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="antialiased max-w-lg mx-4 my-0 flex flex-col md:flex-row lg:mx-auto">
          <div className="flex-auto min-w-0 flex flex-col px-2 md:px-0">
            {children}
            {/* <div className="rounded-t-2xl bg-card-gradient p-4 shadow-md shadow-foreground/20">
              <span className="text-xs text-black">
                2025 © Yawmy. All rights reserved.
              </span>
          </div> */}
          </div>
        </div>
      </body>
    </html>
  );
}
