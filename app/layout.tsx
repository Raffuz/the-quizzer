import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QuizProviderWrapper } from "@/context/QuizContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Quizzer - Metti alla prova le tue conoscenze",
  description:
    "Un'applicazione di quiz interattiva per testare le tue conoscenze su vari argomenti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <QuizProviderWrapper>{children}</QuizProviderWrapper>
      </body>
    </html>
  );
}
