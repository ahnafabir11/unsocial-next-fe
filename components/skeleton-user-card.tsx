import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function UserCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-24 rounded-b-none" />

      <div className="flex flex-col items-center gap-5 -mt-10 pb-4">
        <Skeleton className="w-20 h-20 rounded-full" />

        <Skeleton className="h-4 w-3/4" />

        <div className="w-full flex items-center justify-center gap-4">
          <Skeleton className="h-4 w-2/6" />
          <Skeleton className="h-4 w-2/6" />
        </div>

        <Skeleton className="w-1/4 h-10" />
      </div>
    </Card>
  );
}
