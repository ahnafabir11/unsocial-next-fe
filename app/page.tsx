import UsersList from "@/components/UsersList";
import Container from "@/components/ui/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users | Unsocial",
};

export default function Home() {
  return (
    <main>
      <Container>
        <UsersList />
      </Container>
    </main>
  );
}
