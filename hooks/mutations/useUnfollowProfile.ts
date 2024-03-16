import { unfollowProfile } from "@/services/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUnfollowProfile() {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: (profileId: string) => unfollowProfile(profileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    unfollowProfileData: data?.data.data,
    unfollowProfileError: error,
    isUnfollowProfilePending: isPending,
    mutateUnfollowProfileAsync: mutateAsync,
  };
}
