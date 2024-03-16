import { getProfileFollowings } from "@/services/api/profile";
import { useQuery } from "@tanstack/react-query";

export default function useFollowings(
  profileId: string,
  page?: number,
  limit?: number
) {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ["followings", { profileId, page, limit }],
    queryFn: () => getProfileFollowings(profileId, page, limit),
    select: (data) => data.data.data,
  });

  return {
    followings: data?.followings ?? [],
    totalFollowings: data?.totalFollowings ?? 0,
    followingsError: error,
    refetchFollowings: refetch,
    isFollowingsLoading: isLoading,
  };
}
