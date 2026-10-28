import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestión de inventario Hospitalito",
  description:
    "Ideas prácticas para organizar los recursos, anticipar necesidades y cuidar mejor cada insumo de salud.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
