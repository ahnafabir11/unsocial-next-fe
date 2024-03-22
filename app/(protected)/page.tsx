import Paginator from "@/components/Paginator";
import UserCard from "@/components/UserCard";
import Container from "@/components/ui/container";
import { BASE_URL } from "@/constant/api";
import { cookies } from "next/headers";

interface UsersPageProps {
  params: {};
  searchParams?: { page?: string; limit?: string; search?: string };
}

type UserType = {
  id: string;
  fullName: string;
  coverPicture: null | string;
  followerCount: number;
  profilePicture: null | string;
  followingCount: number;
  followed: boolean;
};

type UsersResponseType = {
  message: string;
  data: { usersCount: number; users: UserType[] };
};

export default async function UsersPage({
  params,
  searchParams,
}: UsersPageProps) {
  const token = cookies().get("token");

  // QUERIES FOR USERS
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 12;

  // FETCHING DATA
  const queries = `?page=${page}&limit=${limit}&search=${search}`;
  const data: UsersResponseType = await fetch(`${BASE_URL}/users${queries}`, {
    headers: { Cookie: `token=${token?.value}` },
  }).then((res) => res.json());
  const { users, usersCount } = data.data;

  const handleFollowUser = (profileId: string, followed: boolean) => {
    console.log({ profileId, followed });
  };

  const PAGINATOR_BASE_URL = `/`;
  const PAGINATOR_NEXT_URL = `${PAGINATOR_BASE_URL}?page=${page + 1}`;
  const PAGINATOR_PREVIOUS_URL = `${PAGINATOR_BASE_URL}?page=${page - 1}`;

  return (
    <>
      <Container className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-8">
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
              handleFollowUser={handleFollowUser}
            />
          );
        })}
      </Container>

      {usersCount > 0 ? (
        <Paginator
          limit={limit}
          className="mb-8"
          currentPage={page}
          total={usersCount}
          baseUrl={PAGINATOR_BASE_URL}
          nextPageUrl={PAGINATOR_NEXT_URL}
          previousPageUrl={PAGINATOR_PREVIOUS_URL}
        />
      ) : (
        <h2 className="text-3xl font-semibold tracking-tight text-center">
          No users found!
        </h2>
      )}
    </>
  );
}
