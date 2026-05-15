import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
  const isAdmin = pathname.includes("/admin");

  return (
    <html lang={locale}>
      <body className={inter.className}>
        {!isAdmin && <Navbar locale={locale} />}
        <main>
          {children}
        </main>
        {!isAdmin && <Footer locale={locale} />}
      </body>
    </html>
  );
}