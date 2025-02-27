"use client";
import { useRef } from "react";
import data from "@/data/data.json";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const onlyCategories = [...new Set(data.map((item) => item.category))];
  return (
    <>
      <Header mainRef={mainRef} footerRef={footerRef} />
      <main ref={mainRef}>{children}</main>
      <Footer footerRef={footerRef} categories={onlyCategories} />
    </>
  );
}
