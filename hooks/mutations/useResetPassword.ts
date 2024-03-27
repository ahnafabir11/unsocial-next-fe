import { ResetPasswordBodyType } from "@/app/auth/change-password/ChangePasswordForm";
import { resetPassword } from "@/services/api/auth";
import { useMutation } from "@tanstack/react-query";

export default function useResetPassword() {
  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: ({
      token,
      body,
    }: {
      token: string;
      body: ResetPasswordBodyType;
    }) => resetPassword(token, body),
  });

  return {
    resetPasswordData: data,
    resetPasswordError: error,
    isResetPasswordPending: isPending,
    mutateResetPasswordAsync: mutateAsync,
  };
}
