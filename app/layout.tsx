import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./header";
import Footer from "./footer";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner"

const poppins = Poppins({
  subsets: ["latin"],
  weight:["300","400","500","600","700"]
})

export const metadata: Metadata = {
  title: "Website Persandian Barito Utara",
  description: "Generate",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}`}
      >
        <Providers>
          <Header />

          <div className="">
            <Toaster position="top-center" richColors   />
            {children}
          </div>

        <Footer />
        </Providers>
      </body>
    </html>
  );
}
