import { editProfile } from "@/services/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useProfileMutation() {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: (data: FormData) => editProfile(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", { profileId: data.data.data.id }],
      });
    },
  });

  return {
    profileMutateData: data,
    profileMutateError: error,
    isProfileMutatePending: isPending,
    profileMutateAsync: mutateAsync,
  };
}
