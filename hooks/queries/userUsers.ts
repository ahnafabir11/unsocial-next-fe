import { getUsers } from "@/services/api/users";
import { useQuery } from "@tanstack/react-query";

export function useUsers(page?: number, limit?: number, search?: string) {
  const { data, error, refetch, isLoading } = useQuery({
    queryKey: ["users", { page, limit, search }],
    queryFn: () => getUsers(page, limit, search),
    select: (data) => data.data.data,
  });

  return {
    users: data?.users ?? [],
    usersCount: data?.usersCount ?? 0,
    usersError: error,
    refetchUsers: refetch,
    isUsersLoading: isLoading,
  };
}
