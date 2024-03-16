import { getCurrentUser } from "@/services/api/auth";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getCurrentUser(),
    select: (data) => data.data.data,
  });

  return {
    user: data,
    refetchUser: refetch,
    userError: error,
    isUserLoading: isLoading,
  };
}
