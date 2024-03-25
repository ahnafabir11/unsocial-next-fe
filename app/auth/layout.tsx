import { Card } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex justify-center items-center">
      <Card className="max-w-sm w-full p-4 m-2">{children}</Card>
    </main>
  );
}
