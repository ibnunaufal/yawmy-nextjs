import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Logo from "@/components/Logo";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

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
  subsets: ["latin"],
});
export const metadata = {
  title: "Yawmy",
  description: "Yawmy is a platform for managing your daily activities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === "production" && (
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-79VMVT7EPH"
          ></Script>
        )}
        {process.env.NODE_ENV === "production" && (
          <Script id="google-analytics">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag(' js', new Date());
            gtag('config', 'G-79VMVT7EPH');
          `}
          </Script>
        )}
        {/* <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-79VMVT7EPH"
          ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag(' js', new Date());
            gtag('config', 'G-79VMVT7EPH');
          `}
        </Script> */}
      </head>
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
        <Toaster />
      </body>
    </html>
  );
}
