import { SignUpBodyType } from "@/components/SignUpForm";
import { signupUser } from "@/services/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useSignUpMutation() {
  const queryClient = useQueryClient();

  const { data, mutateAsync, error, isPending } = useMutation({
    mutationFn: (body: SignUpBodyType) => signupUser(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  return {
    signUpMutateData: data,
    signUpMutateAsync: mutateAsync,
    signUpError: error,
    isSignUpMutatePending: isPending,
  };
}
