import { getProfileFollowers } from "@/services/api/profile";
import { useQuery } from "@tanstack/react-query";

export default function useFollowers(
  profileId: string,
  page?: number,
  limit?: number
) {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ["followers", { profileId, page, limit }],
    queryFn: () => getProfileFollowers(profileId, page, limit),
    select: (data) => data.data.data,
  });

  return {
    followers: data?.followers ?? [],
    totalFollowers: data?.totalFollowers ?? 0,
    followersError: error,
    refetchFollowers: refetch,
    isFollowersLoading: isLoading,
  };
}
