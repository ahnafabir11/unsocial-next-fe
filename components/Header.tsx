import Link from "next/link";
import { Suspense } from "react";
import NavDropdown from "./NavDropdown";
import NavDropdownSkeleton from "./skeleton-nav-dropdown";
import Container from "./ui/container";

export default async function Header() {
  return (
    <header className="py-2">
      <Container className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold tracking-tight">
          <Link href="/">UNSOCIAL</Link>
        </h2>

        <Suspense fallback={<NavDropdownSkeleton />}>
          <NavDropdown />
        </Suspense>
      </Container>
    </header>
  );
}
