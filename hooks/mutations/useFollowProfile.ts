import { followProfile } from "@/services/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useFollowProfile() {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: (profileId: string) => followProfile(profileId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({
        queryKey: ["profile", { profileId: data.data.data.id }],
      });
    },
  });

  return {
    followProfileData: data?.data.data,
    followProfileError: error,
    isFollowProfilePending: isPending,
    mutateFollowProfileAsync: mutateAsync,
  };
}
