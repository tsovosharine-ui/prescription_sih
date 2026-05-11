import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Prescriptions — SIH CHU Andrainjato",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className={`${dmSans.className} ${manrope.className}`}>
        {children}
      </body>
    </html>
  );
}
