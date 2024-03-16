"use client";

import useFollowProfile from "@/hooks/mutations/useFollowProfile";
import useUnfollowProfile from "@/hooks/mutations/useUnfollowProfile";
import { useUsers } from "@/hooks/queries/userUsers";
import { showToastError } from "@/lib/helper";
import { useSearchParams } from "next/navigation";
import FormErrorAlert from "./FormErrorAlert";
import Paginator from "./Paginator";
import UserCard from "./UserCard";

export default function UsersList() {
  const searchParams = useSearchParams();

  const getCurrentPage = (pageParams: string | null) => {
    let currentPage = 1;
    const page = Number(pageParams);
    if (page > 1) {
      return page;
    }
    return currentPage;
  };

  const currentPage = getCurrentPage(searchParams.get("page"));
  const baseUrl = "/";
  const nextPageUrl = `${baseUrl}?page=${currentPage + 1}`;
  const previousPageUrl = `${baseUrl}?page=${currentPage - 1}`;

  const { users, usersCount, usersError, refetchUsers, isUsersLoading } =
    useUsers(currentPage, 12);
  const {
    followProfileData,
    isFollowProfilePending,
    mutateFollowProfileAsync,
  } = useFollowProfile();
  const {
    unfollowProfileData,
    isUnfollowProfilePending,
    mutateUnfollowProfileAsync,
  } = useUnfollowProfile();

  if (isUsersLoading) return "loading...";

  if (usersError) return <FormErrorAlert error={usersError} className="m-4" />;

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
