import { LoginBodyType } from "@/components/SignInForm";
import { loginUser } from "@/services/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLoginMutation() {
  const queryClient = useQueryClient();

  const { data, mutateAsync, error, isPending } = useMutation({
    mutationFn: (body: LoginBodyType) => loginUser(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  return {
    loginMutateData: data,
    loginMutateAsync: mutateAsync,
    isLoginPending: isPending,
    loginError: error,
  };
}
