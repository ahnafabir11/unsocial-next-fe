import Paginator from "@/components/Paginator";
import ProfilesFilter from "@/components/ProfilesFilter";
import UserCard from "@/components/UserCard";
import Container from "@/components/ui/container";
import { getAllProfiles } from "@/lib/data";
import { updateUrlWithQuery } from "@/lib/helper";
import { z } from "zod";

interface UsersPageProps {
  params: {};
  searchParams: { page?: string; limit?: string; search?: string };
}

export default async function UsersPage({
  params,
  searchParams,
}: UsersPageProps) {
  const ProfilesQuerySchema = z.object({
    search: z.string().default(""),
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(12),
  });

  const validation = ProfilesQuerySchema.safeParse(searchParams);

  if (!validation.success) {
    throw new Error("Invalid Query Params !");
  }

  const { page, limit, search } = validation.data;

  const { users, usersCount } = await getAllProfiles({ page, limit, search });

  const PAGINATOR_BASE_URL = updateUrlWithQuery("/", { page, limit, search });

  return (
    <Container className="py-8">
      <ProfilesFilter baseURL={PAGINATOR_BASE_URL} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
        {users.map((user) => {
          const {
            id,
            followed,
            fullName,
            coverPicture,
            followerCount,
            profilePicture,
            followingCount,
          } = user;

          return (
            <UserCard
              key={id}
              id={id}
              followed={followed}
              fullName={fullName}
              coverPicture={coverPicture}
              followerCount={followerCount}
              profilePicture={profilePicture}
              followingCount={followingCount}
            />
          );
        })}
      </div>

      {usersCount > 0 ? (
        <Paginator
          limit={limit}
          currentPage={page}
          total={usersCount}
          baseUrl={PAGINATOR_BASE_URL}
        />
      ) : (
        <h2 className="text-3xl font-semibold tracking-tight text-center">
          No users found!
        </h2>
      )}
    </Container>
  );
}
