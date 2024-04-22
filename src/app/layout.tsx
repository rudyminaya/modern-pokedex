import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/Store";
import InitialLoadPokemon from "./components/InitialLoadPokemon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Busca y aprende más de tus pokémons favoritos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <InitialLoadPokemon />
        <body className={inter.className}>{children}</body>
      </html>
    </StoreProvider>
  );
}
