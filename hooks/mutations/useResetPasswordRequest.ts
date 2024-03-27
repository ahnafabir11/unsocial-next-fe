import { ResetPasswordRequestBodyType } from "@/app/auth/reset-password/ResetPasswordRequestForm";
import { resetPasswordRequest } from "@/services/api/auth";
import { useMutation } from "@tanstack/react-query";

export default function useResetPasswordRequest() {
  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: (body: ResetPasswordRequestBodyType) =>
      resetPasswordRequest(body),
  });

  return {
    resetPasswordRequestData: data,
    resetPasswordRequestError: error,
    isResetPasswordRequestPending: isPending,
    mutateResetPasswordRequestAsync: mutateAsync,
  };
}
