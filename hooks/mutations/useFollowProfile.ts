import { followProfile } from "@/services/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useFollowProfile() {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: (profileId: string) => followProfile(profileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    followProfileData: data?.data.data,
    followProfileError: error,
    isFollowProfilePending: isPending,
    mutateFollowProfileAsync: mutateAsync,
  };
}
