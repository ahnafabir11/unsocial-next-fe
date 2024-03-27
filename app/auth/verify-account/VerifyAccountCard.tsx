"use client";

import FormErrorAlert from "@/components/FormErrorAlert";
import FormSuccessAlert from "@/components/FormSuccessAlert";
import useVerifyProfileMutation from "@/hooks/mutations/useVerifyProfileMutation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface VerifyAccountCardProps {
  token: string;
}

export default function VerifyAccountCard({ token }: VerifyAccountCardProps) {
  const router = useRouter();
  const {
    verifyProfileData,
    verifyProfileError,
    isVerifyProfilePending,
    mutateVerifyProfileAsync,
  } = useVerifyProfileMutation();

  useEffect(() => {
    (async () => {
      try {
        await mutateVerifyProfileAsync(token);
        await (() => new Promise((resolve) => setTimeout(resolve, 5000)))();
        router.push("/auth/signin");
      } catch (e) {}
    })();
  }, [token]);

  return (
    <>
      {isVerifyProfilePending && "Verifying..."}
      <FormErrorAlert error={verifyProfileError} />
      <FormSuccessAlert data={verifyProfileData} />
    </>
  );
}
