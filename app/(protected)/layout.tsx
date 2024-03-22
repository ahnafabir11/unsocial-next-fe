import Header from "@/components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="overflow-auto">{children}</main>
    </section>
  );
}
