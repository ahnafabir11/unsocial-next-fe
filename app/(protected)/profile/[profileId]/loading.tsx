import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container>
      <Card className="overflow-hidden my-8">
        <Skeleton className="h-40 sm:h-52 rounded-b-none" />

        <div className="p-4 pt-0 sm:p-8 sm:pt-0">
          <Skeleton className="h-32 w-32 rounded-full mx-auto sm:mx-0 -mt-20 mb-4" />

          <Skeleton className="h-6 w-52 mx-auto sm:mx-0 mb-4 sm:mb-0" />

          <div className="grid grid-cols-2 sm:grid-cols-[96px_96px_1fr] justify-items-center sm:justify-items-start sm:items-end gap-4 mb-8">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full sm:w-28 col-span-2 sm:col-span-1 sm:place-self-end" />
          </div>

          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-2 w-full sm:w-3/5" />
        </div>
      </Card>
    </Container>
  );
}
