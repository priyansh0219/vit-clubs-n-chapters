import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vit-clubs-n-chapters.vercel.app"),
  title: "VIT Clubs and Chapters",
  description: "Get all info you need for the club/chapter registration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta
          name='google-site-verification'
          content='pJrXQL_TPtxT2kqTcwBcDOOMGn6G3d_wSGH7FtqEht0'
        />
        <meta
          name='google-adsense-account'
          content='ca-pub-4670700793173319'
        ></meta>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId='G-XPRRMSQZ3B' />
    </html>
  );
}
