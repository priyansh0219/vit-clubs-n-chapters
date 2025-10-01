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
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: {
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#1e40af",
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
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link
          rel='icon'
          href='/favicon-32x32.png'
          type='image/png'
          sizes='32x32'
        />
        <link rel='apple-touch-icon' href='/favicon.svg' />
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
