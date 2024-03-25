import { ResetPasswordRequestBodyType } from "@/app/auth/reset-password/ResetPasswordRequestForm";
import { resetPasswordRequest } from "@/services/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useResetPasswordRequest() {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: (body: ResetPasswordRequestBodyType) =>
      resetPasswordRequest(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  return {
    resetPasswordRequestData: data,
    resetPasswordRequestError: error,
    isResetPasswordRequestPending: isPending,
    mutateResetPasswordRequestAsync: mutateAsync,
  };
}
