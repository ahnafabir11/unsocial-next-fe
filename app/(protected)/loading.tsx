import UserCardSkeleton from "@/components/skeleton-user-card";
import Container from "@/components/ui/container";

export default function Loading() {
  return (
    <main>
      <Container className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-8">
        {Array.from({ length: 8 }).map((_, idx) => (
          <UserCardSkeleton key={idx} />
        ))}
      </Container>
    </main>
  );
}
