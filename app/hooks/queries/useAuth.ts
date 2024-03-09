import { getCurrectUser } from '@/app/services/api/auth'
import { useQuery } from '@tanstack/react-query'

export function useAuth() {
  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: () => getCurrectUser(),
    select: (data) => data.data.data,
  })

  return {
    user: data,
    refetchUser: refetch,
    userError: error,
    isUserLoading: isLoading
  }
}
