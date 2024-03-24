import { logoutCurrentUser } from "@/services/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogoutMutation() {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: () => logoutCurrentUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  return {
    logoutData: data,
    logoutError: error,
    isLogoutPending: isPending,
    logoutMutateAsync: mutateAsync,
  };
}
