"use client";

import useFollowProfile from "@/hooks/mutations/useFollowProfile";
import useUnfollowProfile from "@/hooks/mutations/useUnfollowProfile";
import useProfile from "@/hooks/queries/useProfile";
import { getAvatarFallback, showToastError } from "@/lib/helper";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

interface ProfileProps {
  profileId: string;
}

export default function Profile({ profileId }: ProfileProps) {
  const { profileData, profileError, refetchProfile, isProfileLoading } =
    useProfile(profileId);
  const { isFollowProfilePending, mutateFollowProfileAsync } =
    useFollowProfile();
  const { isUnfollowProfilePending, mutateUnfollowProfileAsync } =
    useUnfollowProfile();

  if (isProfileLoading) return "loading...";
  if (profileError || !profileData) return "error";

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
  } = profileData;

  const handleFollowUser = async () => {
    try {
      if (followed) {
        await mutateUnfollowProfileAsync(profileId);
      } else {
        await mutateFollowProfileAsync(profileId);
      }
    } catch (e) {
      showToastError(e);
    }
  };

  return (
    <Card className="overflow-hidden my-8">
      {coverPicture ? (
        <Image
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
          <AvatarImage
            src={profilePicture ?? undefined}
            alt={`profile picture of ${fullName}`}
          />
          <AvatarFallback className="text-2xl font-bold md:text-4xl">
            {getAvatarFallback(fullName)}
          </AvatarFallback>
        </Avatar>

        <div className="mb-4 md:flex items-center justify-between md:mb-8">
          <div className="mb-4 md:mb-0">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center mb-2 hover:underline md:text-left md:text-2xl">
              <Link href={`/profile/${id}`}>{fullName}</Link>
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
              <Button className="w-full md:w-auto" variant="outline">
                Edit Profile
              </Button>
            ) : (
              <Button
                className="w-full md:w-auto"
                onClick={handleFollowUser}
                disabled={isFollowProfilePending || isUnfollowProfilePending}
              >
                {followed ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>
        </div>

        <Separator className="mb-4 md:mb-8" />

        <p className="text-lg font-semibold mb-2">About</p>

        {about ? (
          <small className="text-xm leading-none">Email address</small>
        ) : (
          <p className="text-xs text-muted-foreground">
            Information about this user is not available.
          </p>
        )}
      </div>
    </Card>
  );
}
