import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./styles/base/globals.scss";
import ClientLayout from "./components/ClientLayout";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audiophile E-Commerce Webstie",
  description: "Audiophile E-Commerce Webstie, Frontendmentor Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className}`} suppressHydrationWarning={true}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
