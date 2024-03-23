"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { SERVER_ERROR } from "@/constant/errors";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const { code, title, description } = SERVER_ERROR.find(
    ({ statusText }) => error.message === statusText
  ) ?? { ...SERVER_ERROR[0], title: error.message };

  return (
    <Container className="h-full flex items-center justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-7xl font-extrabold tracking-tight md:text-9xl">
          {code}
        </h1>

        <h4 className="text-xl font-semibold tracking-tight md:text-2xl">
          {title}
        </h4>

        <p className="text-sm text-muted-foreground pb-8">{description}</p>

        {code === 401 ? (
          <Button variant="outline" onClick={() => router.push("/signin")}>
            Sign In
          </Button>
        ) : (
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
        )}
      </div>
    </Container>
  );
}
