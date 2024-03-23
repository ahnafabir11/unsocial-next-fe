import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="h-screen flex items-center justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-7xl font-extrabold tracking-tight md:text-9xl">
          404
        </h1>

        <h4 className="text-xl font-semibold tracking-tight md:text-2xl pb-8">
          This page could not be found
        </h4>

        <Link href="/" className="hover:underline">
          Home Page
        </Link>
      </div>
    </Container>
  );
}
