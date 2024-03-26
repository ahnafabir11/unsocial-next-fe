import Paginator from "@/components/Paginator";
import ProfilesFilter from "@/components/ProfilesFilter";
import UserCard from "@/components/UserCard";
import Container from "@/components/ui/container";
import { BASE_URL } from "@/constant/api";
import { getProfileFollowers } from "@/lib/data";
import { updateUrlWithQuery } from "@/lib/helper";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { z } from "zod";

interface FollowersProps {
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

type ProfileResponseType = {
  message: string;
  data: UserType;
};

export async function generateMetadata(
  { params }: FollowersProps,
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
      title: `Followers | ${fullName}`,
      openGraph: {
        images: profilePicture
          ? [profilePicture, ...previousImages]
          : previousImages,
      },
    };
  } catch {
    return {
      title: "Followers",
    };
  }
}

export default async function Followers({
  params,
  searchParams,
}: FollowersProps) {
  // QUERIES FOR USERS
  const usersQuerySchema = z.object({
    search: z.string().default(""),
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(12),
  });

  const validation = usersQuerySchema.safeParse({
    page: searchParams?.page,
    limit: searchParams?.limit,
    search: searchParams?.search,
  });

  if (!validation.success) {
    throw new Error("Invalid Query Params !");
  }

  const { page, limit } = validation.data;

  const { followers, totalFollowers } = await getProfileFollowers(
    params.profileId,
    validation.data
  );

  const PAGINATOR_BASE_URL = updateUrlWithQuery(
    `/profile/${params.profileId}/followers`,
    validation.data
  );

  return (
    <Container className="py-8">
      <ProfilesFilter baseURL={PAGINATOR_BASE_URL} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
        {followers.map((follow) => {
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
            />
          );
        })}
      </div>

      {totalFollowers > 0 ? (
        <Paginator
          limit={limit}
          currentPage={page}
          total={totalFollowers}
          baseUrl={PAGINATOR_BASE_URL}
        />
      ) : (
        <h2 className="text-3xl font-semibold tracking-tight text-center">
          No followers found
        </h2>
      )}
    </Container>
  );
}
