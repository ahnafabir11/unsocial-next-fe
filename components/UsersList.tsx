"use client";

import useFollowProfile from "@/hooks/mutations/useFollowProfile";
import useUnfollowProfile from "@/hooks/mutations/useUnfollowProfile";
import { useUsers } from "@/hooks/queries/userUsers";
import { showToastError } from "@/lib/helper";
import { useSearchParams } from "next/navigation";
import Paginator from "./Paginator";
import UserCard from "./UserCard";
import usePagination from "@/hooks/usePagination";

export default function UsersList() {
  const searchParams = useSearchParams();
  const { baseUrl, currentPage, nextPageUrl, previousPageUrl } = usePagination(
    searchParams,
    "/"
  );
  const { users, usersCount, usersError, refetchUsers, isUsersLoading } =
    useUsers(currentPage, 12);
  const { isFollowProfilePending, mutateFollowProfileAsync } =
    useFollowProfile();
  const { isUnfollowProfilePending, mutateUnfollowProfileAsync } =
    useUnfollowProfile();

  if (isUsersLoading) return "loading...";
  if (usersError) return "error";

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

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-8">
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
              disableFollowBtn={
                isFollowProfilePending || isUnfollowProfilePending
              }
            />
          );
        })}
      </div>

      <Paginator
        total={usersCount}
        limit={12}
        currentPage={currentPage}
        baseUrl={baseUrl}
        nextPageUrl={nextPageUrl}
        previousPageUrl={previousPageUrl}
        className="mb-8"
      />
    </div>
  );
}
