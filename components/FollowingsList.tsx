"use client";

import useFollowProfile from "@/hooks/mutations/useFollowProfile";
import useUnfollowProfile from "@/hooks/mutations/useUnfollowProfile";
import useFollowings from "@/hooks/queries/useFollowings";
import usePagination from "@/hooks/usePagination";
import { showToastError } from "@/lib/helper";
import { useSearchParams } from "next/navigation";
import UserCard from "./UserCard";
import Paginator from "./Paginator";

interface FollowingsListProps {
  profileId: string;
}

export default function FollowingsList({ profileId }: FollowingsListProps) {
  const searchParams = useSearchParams();
  const { baseUrl, currentPage, nextPageUrl, previousPageUrl } = usePagination(
    searchParams,
    `/profile/${profileId}/followings`
  );
  const { followings, totalFollowings, followingsError, isFollowingsLoading } =
    useFollowings(profileId, currentPage, 12);
  const { isFollowProfilePending, mutateFollowProfileAsync } =
    useFollowProfile();
  const { isUnfollowProfilePending, mutateUnfollowProfileAsync } =
    useUnfollowProfile();

  const handleFollowUser = async (profileId: string, followed: boolean) => {
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

  if (isFollowingsLoading) return "loading...";
  if (followingsError) return "error";

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-8">
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
              disableFollowBtn={
                isFollowProfilePending || isUnfollowProfilePending
              }
            />
          );
        })}
      </div>

      {totalFollowings > 0 ? (
        <Paginator
          total={totalFollowings}
          limit={12}
          currentPage={currentPage}
          baseUrl={baseUrl}
          nextPageUrl={nextPageUrl}
          previousPageUrl={previousPageUrl}
          className="mb-8"
        />
      ) : (
        <h2 className="text-3xl font-semibold tracking-tight text-center">
          This profile has no followings
        </h2>
      )}
    </>
  );
}
