export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <section className="h-screen w-full bg-[#171717]">
      {children}
    </section>

  );
}
