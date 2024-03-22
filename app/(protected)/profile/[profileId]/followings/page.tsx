import Paginator from "@/components/Paginator";
import UserCard from "@/components/UserCard";
import Container from "@/components/ui/container";
import { BASE_URL } from "@/constant/api";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";

interface FollowingsProps {
  params: { profileId: string };
  searchParams?: { page?: string; limit?: string; search?: string };
}

type UserType = {
  id: string;
  email: string;
  fullName: string;
  about: null | string;
  coverPicture: null | string;
  profilePicture: null | string;
  verified: boolean;
  createdAt: string;
  followerCount: number;
  followingCount: number;
  myself: boolean;
  followed: boolean;
};

type FollowStatus = "PENDING" | "APPROVED";

type FollowType = {
  createdAt: string;
  status: FollowStatus;
  followerId: string;
  followingId: string;
  myself: true;
  followed: false;
  user: UserType;
};

type ProfileResponseType = {
  message: string;
  data: UserType;
};

type FollowingsResponseType = {
  message: string;
  data: {
    totalFollowings: number;
    followings: FollowType[];
  };
};

export async function generateMetadata(
  { params }: FollowingsProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const token = cookies().get("token");
    const data: ProfileResponseType = await fetch(
      `${BASE_URL}/profile/${params.profileId}`,
      { headers: { Cookie: `token=${token?.value}` } }
    ).then((res) => res.json());

    const { fullName, profilePicture } = data.data;
    const previousImages = (await parent).openGraph?.images || [];

    return {
      metadataBase: new URL(
        "https://unsocial-bucket.s3.ap-southeast-1.amazonaws.com"
      ),
      title: `Followings | ${fullName}`,
      openGraph: {
        images: profilePicture
          ? [profilePicture, ...previousImages]
          : previousImages,
      },
    };
  } catch {
    return {
      title: "Followings",
    };
  }
}

export default async function Followings({
  params,
  searchParams,
}: FollowingsProps) {
  const token = cookies().get("token");

  // QUERIES FOR USERS
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 12;

  // FETCHING DATA
  const queries = `?page=${page}&limit=${limit}&search=${search}`;
  const data: FollowingsResponseType = await fetch(
    `${BASE_URL}/profile/${params.profileId}/followings${queries}`,
    { headers: { Cookie: `token=${token?.value}` } }
  ).then((res) => res.json());
  const { followings, totalFollowings } = data.data;

  const handleFollowUser = (profileId: string, followed: boolean) => {
    console.log({ profileId, followed });
  };

  const PAGINATOR_BASE_URL = `/profile/${params.profileId}/followings`;
  const PAGINATOR_NEXT_URL = `${PAGINATOR_BASE_URL}?page=${page + 1}`;
  const PAGINATOR_PREVIOUS_URL = `${PAGINATOR_BASE_URL}?page=${page - 1}`;

  return (
    <>
      <Container className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-8">
        {followings.map((follow) => {
          const { myself, followed, user } = follow;
          const {
            id,
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
              myself={myself}
              followed={followed}
              fullName={fullName}
              coverPicture={coverPicture}
              followerCount={followerCount}
              profilePicture={profilePicture}
              followingCount={followingCount}
              handleFollowUser={handleFollowUser}
              disableFollowBtn={false}
            />
          );
        })}
      </Container>

      {totalFollowings > 0 ? (
        <Paginator
          limit={limit}
          className="mb-8"
          currentPage={page}
          total={totalFollowings}
          baseUrl={PAGINATOR_BASE_URL}
          nextPageUrl={PAGINATOR_NEXT_URL}
          previousPageUrl={PAGINATOR_PREVIOUS_URL}
        />
      ) : (
        <h2 className="text-3xl font-semibold tracking-tight text-center">
          This profile has no followings
        </h2>
      )}
    </>
  );
}
