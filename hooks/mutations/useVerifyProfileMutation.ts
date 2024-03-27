import { verifyUser } from "@/services/api/auth";
import { useMutation } from "@tanstack/react-query";

export default function useVerifyProfileMutation() {
  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: (token: string) => verifyUser(token),
  });

  return {
    verifyProfileData: data,
    verifyProfileError: error,
    isVerifyProfilePending: isPending,
    mutateVerifyProfileAsync: mutateAsync,
  };
}
