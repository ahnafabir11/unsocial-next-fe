import EditProfileDialog from "@/components/EditProfileDialog";
import ProfileCardFollowButton from "@/components/ProfileCardFollowButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { BASE_URL } from "@/constant/api";
import { getProfile } from "@/lib/data";
import { getAvatarFallback } from "@/lib/helper";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

interface ProfilePageProps {
  params: { profileId: string };
  searchParams: {};
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
  { params }: ProfilePageProps,
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
      title: fullName,
      openGraph: {
        images: profilePicture
          ? [profilePicture, ...previousImages]
          : previousImages,
      },
    };
  } catch {
    return {
      title: "Profile",
    };
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profile = await getProfile(params.profileId);
  const {
    id,
    about,
    myself,
    fullName,
    followed,
    coverPicture,
    followerCount,
    profilePicture,
    followingCount,
  } = profile;

  return (
    <Container>
      <Card className="overflow-hidden my-8">
        {coverPicture ? (
          <Image
            priority
            width={1500}
            height={500}
            src={coverPicture}
            className="w-full h-40 md:h-52"
            alt={`cover picture of ${fullName}`}
          />
        ) : (
          <div className="w-full h-40 md:h-52 bg-gray-300" />
        )}

        <div className="p-4 pt-0 md:p-8 md:pt-0">
          <Avatar className="h-32 w-32 mx-auto -mt-20 mb-4 md:mx-0">
            <AvatarImage src={profilePicture ?? undefined} asChild>
              {profilePicture && (
                <Image
                  width={100}
                  height={100}
                  src={profilePicture}
                  alt={`profile picture of ${fullName}`}
                />
              )}
            </AvatarImage>
            <AvatarFallback className="text-2xl font-bold md:text-4xl">
              {getAvatarFallback(fullName)}
            </AvatarFallback>
          </Avatar>

          <div className="mb-4 md:flex items-center justify-between md:mb-8">
            <div className="mb-4 md:mb-0">
              <h4 className="text-xl font-semibold tracking-tight text-center mb-2 md:text-left md:text-2xl">
                {fullName}
              </h4>

              <div className="flex h-5 items-center justify-center space-x-2 md:justify-start">
                <small className="text-sm font-medium leading-none hover:underline md:text-base">
                  <Link href={`/profile/${id}/followers`}>
                    {followerCount} Followers
                  </Link>
                </small>

                <Separator orientation="vertical" />

                <small className="text-sm font-medium leading-none hover:underline md:text-base">
                  <Link href={`/profile/${id}/followings`}>
                    {followingCount} Followings
                  </Link>
                </small>
              </div>
            </div>

            <div className="space-y-2 md:space-y-0 md:space-x-2">
              {myself ? (
                <EditProfileDialog fullName={fullName} about={about} />
              ) : (
                <ProfileCardFollowButton
                  id={id}
                  myself={myself}
                  followed={followed}
                  className="w-full md:w-auto"
                />
              )}
            </div>
          </div>

          <Separator className="mb-4 md:mb-8" />

          <p className="text-lg font-semibold mb-2">About</p>

          {about ? (
            <small className="text-xm leading-none whitespace-pre">
              {about}
            </small>
          ) : (
            <p className="text-xs text-muted-foreground">
              Information about this user is not available.
            </p>
          )}
        </div>
      </Card>
    </Container>
  );
}
