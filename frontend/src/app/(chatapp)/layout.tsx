import { Roboto } from "next/font/google";
import { UserProvider } from "../context/UserContext";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <UserProvider>
      <section className={`h-screen w-full flex bg-[#171717] ${roboto.className}`}>
        {children}
      </section>
    </UserProvider>
  );
}
