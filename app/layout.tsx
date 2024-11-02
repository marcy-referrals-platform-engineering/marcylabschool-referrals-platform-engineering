
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/lib/auth";
import ClientSessionProvider from "./components/layout/ClientSessionProvider";
import "./globals.css";
import localFont from "next/font/local";



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={` antialiased`}>
        <ClientSessionProvider session={session}>
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}