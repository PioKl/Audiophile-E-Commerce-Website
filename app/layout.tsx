import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./styles/base/globals.scss";
import data from "@/data/data.json";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

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
  const onlyCategories = [...new Set(data.map((item) => item.category))];
  return (
    <html lang="en">
      <body className={`${manrope.className}`} suppressHydrationWarning={true}>
        <Header />
        {children}
        <Footer categories={onlyCategories} />
      </body>
    </html>
  );
}
