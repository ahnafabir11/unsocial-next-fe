import { getProfile } from "@/services/api/profile";
import { useQuery } from "@tanstack/react-query";

export default function useProfile(profileId: string) {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ["profile", { profileId }],
    queryFn: () => getProfile(profileId),
    select: (data) => data.data.data,
  });

  return {
    profileData: data,
    profileError: error,
    refetchProfile: refetch,
    isProfileLoading: isLoading,
  };
}
