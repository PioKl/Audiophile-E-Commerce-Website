import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./styles/base/globals.scss";
import ClientLayout from "./components/ClientLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ToastContainer } from "react-toastify";

const manrope = Manrope({
  subsets: ["latin"],
  preload: true,
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
      <AuthProvider>
        <CartProvider>
          <body
            className={`${manrope.className}`}
            suppressHydrationWarning={true}
          >
            <ToastContainer />
            <div id="modal-hook"></div> {/* dla sposobu bez mui modal */}
            <ClientLayout>{children}</ClientLayout>
          </body>
        </CartProvider>
      </AuthProvider>
    </html>
  );
}
