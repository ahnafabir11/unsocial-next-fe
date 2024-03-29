import UserCardSkeleton from "./skeleton-user-card";
import Container from "./ui/container";
import { Skeleton } from "./ui/skeleton";

export default function ProfilesSkeleton() {
  return (
    <Container className="py-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-4">
        <Skeleton className="h-9 sm:w-40" />
        <Skeleton className="h-9 sm:w-60" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <UserCardSkeleton key={idx} />
        ))}
      </div>
    </Container>
  );
}
