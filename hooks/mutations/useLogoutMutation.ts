import { logoutCurrentUser } from "@/app/services/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogoutMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, error } = useMutation({
    mutationFn: () => logoutCurrentUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  return {
    logoutMutateAsync: mutateAsync,
    logoutError: error,
  };
}
