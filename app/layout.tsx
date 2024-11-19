
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/lib/auth";
import ClientSessionProvider from "./components/layout/ClientSessionProvider";
import "./globals.css";
import localFont from "next/font/local";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar/index";
import { RelationModal } from "./components/layout/RelationModal";


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
        <RelationModal />
          <Sidebar />
          <Header />
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}