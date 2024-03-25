import { ResetPasswordBodyType } from "@/app/auth/change-password/ChangePasswordForm";
import { resetPassword } from "@/services/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useResetPassword() {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: ({
      token,
      body,
    }: {
      token: string;
      body: ResetPasswordBodyType;
    }) => resetPassword(token, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  return {
    resetPasswordData: data,
    resetPasswordError: error,
    isResetPasswordPending: isPending,
    mutateResetPasswordAsync: mutateAsync,
  };
}
