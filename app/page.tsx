import UsersList from "@/components/UsersList";
import Container from "@/components/ui/container";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users | Unsocial",
};

export default async function Home() {
  return (
    <main>
      <Container>
        <Suspense>
          <UsersList />
        </Suspense>
      </Container>
    </main>
  );
}
